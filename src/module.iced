# vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2
log = (x...) -> try console.log x...

_ = require('wegweg')({
  globals: on
  shelljs: on
})

if !_.arg('file')
  throw new Error '`--file` required'

file = _.resolve(_.arg 'file')

if !_.exists(file)
  throw new Error 'File noexists'

creds = require __dirname + '/../config'

##
aws = require 'aws-sdk'

aws.config.update({
  accessKeyId: creds.access
  secretAccessKey: creds.secret
})

s3 = new aws.S3()

new_filename = (do =>
  orig = _.base(file)
  orig = orig.split('.')
  extension = orig.pop()
  return _.uuid() + '.' + extension
)

opt = {
  Bucket: conf.s3.bucket
  Key: conf.bucket + '/' + new_filename
  ContentType: _.mime(new_filename)
  ACL: 'public-read'
}

log _.fns(s3)
exit 0

await s3.getSignedUrl 'putObject', opt, defer e,r
if e then return next e

##
if !module.parent
  log /DEVEL/
  process.exit 0

