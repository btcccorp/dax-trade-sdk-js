const axios = require('axios')
const AWS = require('aws-sdk')
const URI = require('urijs')
const md5 = require('blueimp-md5')

const signAxios = (credential) => {
  const signedAxios = axios.create({
    baseURL: 'http://lb-greenstage-835069912.ap-northeast-1.elb.amazonaws.com/tradeapi'
  })

  signedAxios.interceptors.request.use((config) => {
    const url = new URI(config.url)

    let options = {
      method: config.method.toUpperCase(),
      path: url.pathname(),
      headers: {
        'presigned-expires': AWS.util.date.rfc822()
      }
    }

    if (config.data) {
      const body = config.transformRequest[0](config.data)
      options.headers['Content-Type'] = 'application/json;charset=utf-8'
      options.headers['Content-Length'] = Buffer.byteLength(body)
      options.headers['Content-MD5'] = md5(body)
    }

    const signer = new AWS.Signers.S3(options);
    signer.addAuthorization(credential)

    config.headers.common.Authorization = signer.request.headers.Authorization
    config.headers.common.Date = signer.request.headers['presigned-expires']
    if (config.data) {
      config.headers[config.method]['Content-MD5'] =
        signer.request.headers['Content-MD5']
    }

    return config
  })

  return signedAxios
}

module.exports = signAxios
