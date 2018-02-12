import * as Minio from 'minio'
import * as multer from 'multer'
import * as uuid from 'uuid'
import * as util from 'util'
import * as path from 'path'
import * as fs from 'fs'
import * as Jimp from 'jimp'

import * as config from 'config'
import { BadRequest, NotFound } from '@ffra/errors'

export const minioClient = new Minio.Client(config.get('minio'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.get('filesystem.tmp') as string)
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname +
                '-' +
                Date.now() +
                '.' +
                file.originalname.split('.').pop()
        )
    }
})
const uploader = multer({
    storage,
    fileFilter: (req, file, cb) => {
        let extension = file.originalname.split('.').pop()
        if (['jpg', 'jpeg', 'png', 'bmp'].indexOf(extension) > -1) {
            return cb(null, true)
        }
        return cb(
            new BadRequest(
                'Not supported file extension: jpg, jpeg, png, bmp (only)'
            ),
            false
        )
    }
})

const upload = function(field, req, res) {
    return new Promise((resolve, reject) => {
        uploader.single(field)(req, res, err => {
            if (err) {
                reject(err)
            }
            resolve(req.file)
        })
    })
}

let resizeImg = function(imagePath, outputPath, width = 200, height = 200) {
    return Jimp.read(imagePath).then(img =>
        img.resize(width, height).write(outputPath)
    )
}

const minioUpload = (bucket, filename, path) =>
    new Promise((resolve, reject) =>
        minioClient.fPutObject(
            bucket,
            filename,
            path,
            'application/octet-stream',
            (err, etag) => (err ? reject(err) : resolve())
        )
    )

const removeLocalImage = path =>
    new Promise((resolve, reject) => {
        if (fs.existsSync(path)) {
            fs.unlink(path, err => {
                if (err) {
                    reject(err)
                }
                resolve()
            })
        } else {
            resolve()
        }
    })

export const minioRemove = (bucket, file) =>
    new Promise((resolve, reject) =>
        minioClient.removeObject(
            bucket,
            file,
            err => (err ? reject(err) : resolve())
        )
    )

export const localRemove = (bucket, filename) =>
    removeLocalImage(`${config.get('filesystem.images')}/${bucket}/${filename}`)

export const minioUrl = (file, bucket) =>
    `${config.get('minio.secure') ? 'https' : 'http'}
        ://${config.get('minio.endPoint')}/${bucket}/${file}`

export const uploadImage = async (
    bucket,
    field,
    { req, res },
    height?,
    width?,
    name?
) => {
    let image = await upload('file', req, res)
    let { filename, path } = image as any
    let imagesToDelete = [path]

    try {
        filename = name
            ? `${name}-${Date.now()}.${path.split('.').reverse()[0]}`
            : `${Date.now()}.${path.split('.').reverse()[0]}`

        // let outPath = `${config.get('filesystem.tmp')}/${filename}`
        let outPath = `${config.get('filesystem.images')}/${bucket}/${filename}`

        if (height && width) {
            let resizedImg = await resizeImg(path, outPath, height, width)

            path = outPath
            // imagesToDelete.push(resizePath)
        } else {
            await Jimp.read(path)
                .then(img => {
                    img.write(outPath) // save
                })
                .catch(err => {
                    console.error(err)
                })
        }

        // await minioUpload(bucket, filename, path)

        await Promise.all(imagesToDelete.map(removeLocalImage))

        return {
            filename,
            // bucket,
            // url: minioUrl(filename, bucket)
            url: `${config.get('imagesEndpoint')}/${bucket}/${filename}`
        }
    } catch (error) {
        console.error(error)
        await Promise.all(imagesToDelete.map(removeLocalImage))
        throw error
    }
}
