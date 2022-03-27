import multer from 'multer'
import __dirname from 'path'


const storageEngine = multer.diskStorage ({
   destination:function(req,file,cb){
       cb(null,'./public-static')
   },
   filename:function(req,file,cb){
       cb(null, file.originalname)
   }
  });

  export const upload = multer({storage:storageEngine})

  export const Public = 'static/'