import Route from "koa-router";
import Multer from "@koa/multer";

const route = new Route();

const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/photo");
  },
  filename: (req, file, cb) => {
    let type = file.originalname.replace(/.+\./, ".");
    cb(null, file.fieldname + "-" + Date.now() + type);
  },
});
const upload = Multer({ storage: storage });


route.post("/v1/upload", upload.single("files"), Upload);
async function Upload(ctx) {
  if (ctx.file) {
    const imgName = ctx.file.filename;
    const imgurl = "/photo/" + ctx.file.filename;
    const type = ctx.request.body.type || "banner";
    console.log("success storing", imgName, imgurl, type);

    ctx.body = `http://localhost:8903${imgurl}`;
  }
}

export default route.routes()
