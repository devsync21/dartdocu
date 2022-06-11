import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";
import AWS from "aws-sdk";
import moment from "moment";
export default {
    methods: {
        inputfocused(event) {
            console.log(event.target.id.substring(1))
            event.target.id.substring(1)
            this.guideText = event.srcElement.name


        },

        canvas1reset() {
            var c1 = document.getElementById('canvas1')
            this.ctx.clearRect(0, 0, c1.width, c1.height);
        },
        canvas2reset() {
            var c1 = document.getElementById('canvas2')
            this.ctx.clearRect(0, 0, c1.width, c1.height);
        },
        canvas3reset() {
            var c1 = document.getElementById('canvas3')
            this.ctx.clearRect(0, 0, c1.width, c1.height);
        },
        startPainting(e) {
            // console.log(e.target.id)
            var canvasid = e.target.id
            // if (this.onlyFirst == 0) {
            var canvas = document.getElementById(e.target.id);
            this.ctx = canvas.getContext("2d");
            this.rect = canvas.getBoundingClientRect();
            this.ctx.strokeStyle = "black";
            this.ctx.lineJoin = "round";
            this.ctx.lineWidth = 3;
            this.onlyFirst++;
            // console.log("only");

            //   console.log("start");
            //   console.log(this.rect.top);
            this.painting = true;

            this.addClick(
                e.touches[0].clientX - this.rect.left,
                e.touches[0].clientY - this.rect.top,
                true
            );
            this.redraw();
        },
        finishedPainting() {
            this.painting = false;
            (this.clickX = []), (this.clickY = []);
            //   console.log("mouseup");
        },
        mousemove(e) {
            e.preventDefault();
            //   console.log("move");
            if (this.painting) {
                this.addClick(
                    e.touches[0].clientX - this.rect.left,
                    e.touches[0].clientY - this.rect.top,
                    true
                );
                this.redraw();
            }
        },
        addClick(x, y, dragging) {
            this.clickX.push(x);
            this.clickY.push(y);
            this.clickDrag.push(dragging);
        },
        redraw() {
            this.ctx.beginPath();

            if (this.clickDrag) {
                this.ctx.moveTo(
                    this.clickX[this.clickX.length - 2],
                    this.clickY[this.clickX.length - 2]
                );
            } else {
                this.ctx.moveTo(
                    this.clickX[this.clickX.length - 1],
                    this.clickY[this.clickX.length - 1]
                );
            }

            this.ctx.lineTo(
                this.clickX[this.clickX.length - 1],
                this.clickY[this.clickX.length - 1]
            );

            this.ctx.closePath();
            this.ctx.stroke();
        },
        saveDiv() {
            // this.pdfToSave.save('NPForm.pdf')
        },

        uploadDiv() {
            console.log('button clicked for upload')
            var doc = new jsPDF("p", "mm", "a4");
            var width = doc.internal.pageSize.getWidth();
            var height = doc.internal.pageSize.getHeight();
            var el1 = document.getElementById("pdf2");
            // var el2 = document.getElementById("pdf3");

            window.scrollTo(0, 0);
            this.dialog = true;

            //create first image
            console.log('before first html2canvAS')
            html2canvas(el1, {
                windowWidth: el1.scrollWidth,
                windowHeight: el1.scrollHeight
            }).then(canvas => {
                console.log('after first html2canvAS')

                var img = canvas.toDataURL("image/png");
                console.log('before first add image')
                doc.addImage(img, "PNG", 0, 0, width, height, undefined, 'FAST');
                console.log("el1 done");
                // doc.save("tes.pdf");
                ///////
                this.uploadDiv2(doc, width, height);

                console.log("el1 done-2");
                //////
            });
        },
        uploadDiv2(doc, width, height) {
            var el2 = document.getElementById("pdf3");
            console.log('2-1')
            html2canvas(el2, {
                windowWidth: el2.scrollWidth,
                windowHeight: el2.scrollHeight
            }).then(canvas => {
                console.log('2-2')
                var img = canvas.toDataURL("image/png");
                console.log('2-3')
                doc.addPage();
                console.log('2-4')
                doc.addImage(img, "PNG", 0, 0, width, height, undefined, 'FAST');
                console.log("el2 done");

                ///////
                this.uploadDiv3(doc, width, height);
                //////
            });
        },
        uploadDiv3(doc, width, height) {
            var el3 = document.getElementById("pdf4");
            html2canvas(el3, {
                windowWidth: el3.scrollWidth,
                windowHeight: el3.scrollHeight
            }).then(canvas => {
                var img = canvas.toDataURL("image/png");
                doc.addPage();
                doc.addImage(img, "PNG", 0, 0, width, height, undefined, 'FAST');
                console.log("el3 done");
                // doc.save("tes.pdf");
                // this.pdfToSave = doc


                var newFileName = "testpdf";
                var pdf = doc.output("arraybuffer"); //returns raw body of resulting PDF returned as a string as per the plugin documentation.
                var data = new FormData();
                data.append("data", pdf);
                // console.log(this.ptname, this.date);
                // this.filename();
                this.uploadPDF(pdf);
                //////
            });
        },
        filename() {
            var tstamp = moment()
                .unix()
                .toString();

            var dd = moment().format("MMDD");
            var st = this.vm1 + this.pdf1.fname
            var str = st
                .replace(/\s+/g, "")
                .split(",")
                .join("")
                .split(".")
                .join("");
            var fname = dd + "-" + str + "-" + tstamp;
            return fname;
        },
        uploadPDF(file) {
            AWS.config.update({
                region: this.bucketRegion,
                credentials: new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: this.IdentityPoolId
                })
            });

            var s3 = new AWS.S3({
                apiVersion: "2006-03-01",
                params: { Bucket: this.albumBucketName }
            });
            var fn = this.filename();
            var photoKey = "NPform/" + fn + ".pdf";
            //   var photoKey = "test/test.pdf";

            s3.upload(
                {
                    //   Bucket: this.albumBucketName,
                    Key: photoKey,
                    Body: file,
                    ACL: "public-read"
                },
                (err, data) => {
                    if (err) {
                        // console.log("err", err);
                        return;
                    }
                    console.log('uploaded')
                    this.status = !this.status;

                    this.message = "Successfully Submitted!";
                    this.message2 = "You can finish now. Thank you";
                }
            );
            ///////

            ///////
        },
        // blankname() {
        //     var nf = document.getElementById("textname");
        //     //   console.log("blankname", nf.style);
        //     window.scrollTo(0, 0);
        //     nf.style.border = "6px solid red";
        //     this.dialog2 = true;
        //     this.message3 = "Please fill Name!!";
        // },
        // blanksign() {
        //     var nf2 = document.getElementById("canvas");
        //     nf2.style.border = "6px solid red";
        //     window.scrollTo(0, document.body.scrollHeight);
        //     this.dialog2 = true;
        //     this.message3 = "Please sign on bottom";
        // },
        // detectMob() {
        //     if (window.innerWidth <= 800 && window.innerHeight <= 600) {
        //         // console.log("mobile", window.innerWidth, window.innerHeight);
        //         this.mob = true;
        //     } else {
        //         // console.log("desktop", window.innerWidth, window.innerHeight);
        //         this.mob = false;
        //     }
        //     return;
        // },
        // is_touch_device() {
        //     try {
        //         document.createEvent("TouchEvent");
        //         return true;
        //     } catch (e) {
        //         return false;
        //     }
        // }
    }


}