<template>
  <div class="outside" id="pdf">
    <div
      class="back"
      id="pdf2"
      :style="{ backgroundImage: `url(${this.covid2})` }"
    >
      <input type="text" name="text1" id="textname" v-model="ptname" />
      <input type="date" name="text2" id="textdate" v-model="date" />

      <div class="guideline"></div>
      <div class="chcontain">
        <input type="checkbox" id="chbox1" class="ckb" />
        <input type="checkbox" id="chbox2" class="ckb" />
        <input type="checkbox" id="chbox3" class="ckb" />
        <input type="checkbox" id="chbox4" class="ckb" />
        <input type="checkbox" id="chbox5" class="ckb" />
        <input type="checkbox" id="chbox6" class="ckb" />

        <input type="checkbox" id="chbox7" class="ckb" />
        <input type="checkbox" id="chbox8" class="ckb" />
        <input type="checkbox" id="chbox9" class="ckb" />
        <input type="checkbox" id="chbox10" class="ckb" />
        <input type="checkbox" id="chbox11" class="ckb" />
        <input type="checkbox" id="chbox12" class="ckb" />

        <input type="checkbox" id="chbox13" class="ckb" />
        <input type="checkbox" id="chbox14" class="ckb" />
        <input type="checkbox" id="chbox15" class="ckb" />
        <input type="checkbox" id="chbox16" class="ckb" />
        <input type="checkbox" id="chbox17" class="ckb" />
        <input type="checkbox" id="chbox18" class="ckb" />
      </div>

      <canvas
        id="canvas"
        ref="select"
        width="220px"
        height="50px"
        @mousedown="startPainting"
        @touchstart="startPainting"
        @mouseup="finishedPainting"
        @touchend="finishedPainting"
        @mousemove="mousemove"
        @touchmove="mousemove"
      ></canvas>
    </div>
    <!-- <v-btn @click="uploadDiv()">upload PDF</v-btn>
    <v-btn @click="saveDiv()">SAVE to PDF</v-btn> -->

    <v-dialog v-model="dialog" width="400px">
      <v-card class="mx-auto" max-width="400">
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title
            >{{ this.message }}

            <v-progress-circular
              class="ring ml-4"
              indeterminate
              color="green"
              v-show="!this.status"
            ></v-progress-circular>
          </v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0"></v-card-subtitle>

        <v-card-text class="text--primary">
          <div></div>

          <div>{{ this.message2 }}</div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="orange" @click="dialog = false" v-show="this.status">
            Finish
          </v-btn>

          <v-btn color="orange" @click="saveDiv()" v-show="this.status">
            Save to my device
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" width="400px">
      <v-card width="400px" height="250px">
        <div class="message3">
          <div class="sp"></div>
          <span>
            {{ this.message3 }}
          </span>
        </div>
      </v-card>
      <v-btn color="error" @click="dialog2 = false">Close</v-btn>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import covid2 from "@/assets/covid.jpg";
import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";
import AWS from "aws-sdk";
import moment from "moment";

// Initialize the Amazon Cognito credentials provider
// AWS.config.region = 'us-east-2'; // Region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-east-2:2b9b6ec0-eff7-4841-939b-31726e96c782',
// });

export default {
  data() {
    return {
      covid2,
      ctx: null,
      painting: null,
      rect: null,
      clickX: [],
      clickY: [],
      clickDrag: [],
      paint: null,
      onlyFirst: 0,

      ptname: "",
      date: "",

      // albumBucketName: "dartdocucenter",
      // bucketRegion: "us-east-2",
      // IdentityPoolId: "us-east-2:2b9b6ec0-eff7-4841-939b-31726e96c782",

      albumBucketName: "dartdocucenter",
      bucketRegion: "us-east-2",
      IdentityPoolId: "us-east-2:2b9b6ec0-eff7-4841-939b-31726e96c782",

      dialog: false,
      dialog2: false,
      message: "Please Wait....   ",
      message2: "We are sending documents to D'Art Dental",
      message3: "",
      status: false,
      mob: false
    };
  },
  computed: {
    ...mapState(["savepdf", "uploadpdf"])
  },
  methods: {
    startPainting(e) {
      if (this.onlyFirst == 0) {
        var canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.rect = canvas.getBoundingClientRect();
        this.ctx.strokeStyle = "black";
        this.ctx.lineJoin = "round";
        this.ctx.lineWidth = 3;
        this.onlyFirst++;
        // console.log("only");
      }
      //   console.log("start");
      //   console.log(this.rect.top);
      this.painting = true;

      this.addClick(
        e.clientX - this.rect.left,
        e.clientY - this.rect.top,
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
      //   console.log("move");
      if (this.painting) {
        this.addClick(
          e.clientX - this.rect.left,
          e.clientY - this.rect.top,
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
      //   for (var i = 0; i < this.clickX.length; i++) {
      //     if (this.clickDrag[i]) {
      //       this.ctx.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
      //     } else {
      //       this.ctx.moveTo(this.clickX[i], this.clickY[i]);
      //     }
      //     console.log("for");
      //     this.ctx.lineTo(this.clickX[i], this.clickY[i]);
      //     this.ctx.closePath();
      //     this.ctx.stroke();
      //   }
      // }

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
      var element = document.getElementById("pdf2");
      window.scrollTo(0, 0);

      //   console.log(element, element.scrollWidth, element.scrollHeight);
      html2canvas(element, {
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      }).then(canvas => {
        let imgData = canvas.toDataURL("image/png");
        // window.open(imgData);
        // document.body.appendChild(canvas);
        // var link = document.createElement("a");
        // document.body.appendChild(link);
        // link.download = "html_image.png";
        // link.href = canvas.toDataURL("image/png");
        // link.target = "_blank";
        // link.click();
        var doc = new jsPDF("p", "mm");
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();

        doc.addImage(imgData, "PNG", 0, 0, width, height);
        // console.log("before save", height);
        doc.save("DartCovidScreening.pdf");
      });
    },
    uploadDiv() {
      if (this.ptname == "dartadmin") {
        var pw = prompt("Please enter password");
        if (pw == "2875") {
          this.$router.push({ name: "admin" });
          return;
        }
      }
      if (this.ptname == "") {
        this.blankname();
        return;
      }
      if (this.onlyFirst == 0) {
        this.blanksign();
        return;
      }

      var element = document.getElementById("pdf2");

      window.scrollTo(0, 0);

      this.dialog = true;

      //   console.log(element, element.scrollWidth, element.scrollHeight);
      html2canvas(element, {
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      }).then(canvas => {
        let imgData = canvas.toDataURL("image/png");

        var doc = new jsPDF("p", "mm");
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();

        doc.addImage(imgData, "PNG", 0, 0, width, height);
        var newFileName = "testpdf";
        // console.log(doc);
        var pdf = doc.output("arraybuffer"); //returns raw body of resulting PDF returned as a string as per the plugin documentation.
        var data = new FormData();
        data.append("data", pdf);
        // console.log(this.ptname, this.date);
        // this.filename();
        this.uploadPDF(pdf);
        // doc.save("l.pdf");
      });

      //////
    },
    filename() {
      var tstamp = moment()
        .unix()
        .toString();

      var dd = moment().format("MMDD");
      var str = this.ptname
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
      var photoKey = "covid-Pre/" + fn + ".pdf";
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

          this.status = !this.status;

          this.message = "Successfully Submitted!";
          this.message2 = "You can finish now. Thank you";
        }
      );
      ///////

      ///////
    },
    blankname() {
      var nf = document.getElementById("textname");
      //   console.log("blankname", nf.style);
      window.scrollTo(0, 0);
      nf.style.border = "6px solid red";
      this.dialog2 = true;
      this.message3 = "Please fill Name!!";
    },
    blanksign() {
      var nf2 = document.getElementById("canvas");
      nf2.style.border = "6px solid red";
      window.scrollTo(0, document.body.scrollHeight);
      this.dialog2 = true;
      this.message3 = "Please sign on bottom";
    },
    detectMob() {
      if (window.innerWidth <= 800 && window.innerHeight <= 600) {
        // console.log("mobile", window.innerWidth, window.innerHeight);
        this.mob = true;
      } else {
        // console.log("desktop", window.innerWidth, window.innerHeight);
        this.mob = false;
      }
      return;
    },
    is_touch_device() {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {
        return false;
      }
    }
  },
  mounted() {},
  watch: {
    savepdf(nd, od) {
      this.saveDiv();
    },
    uploadpdf(nd, od) {
      this.uploadDiv();
    }
  }
};
</script>
<style lang="scss" scoped>
.outside {
  overflow: auto;
  position: relative;
}
.back {
  width: 800px;
  height: 1100px;
  background-size: contain;
  //   background-size: 100% 100%;
}
.chcontain {
  position: relative;
}
#canvas {
  position: absolute;
  margin-left: 140px;
  margin-top: 940px;

  background-color: ghostwhite;
}
#textname {
  position: absolute;
  border: 1px solid green;
  margin-left: 160px;
  margin-top: 155px;
}
#textdate {
  position: absolute;
  border: 1px solid green;
  margin-left: 584px;
  margin-top: 155px;
  width: 150px;
}
input[type="checkbox"] {
  position: absolute;
  transform: scale(1.5);
}
#chbox1 {
  margin-left: 515px;
  margin-top: 276px;
}
#chbox2 {
  margin-left: 570px;
  margin-top: 276px;
}
#chbox3 {
  margin-left: 515px;
  margin-top: 342px;
}
#chbox4 {
  margin-left: 570px;
  margin-top: 342px;
}
#chbox5 {
  margin-left: 515px;
  margin-top: 408px;
}
#chbox6 {
  margin-left: 570px;
  margin-top: 408px;
}

#chbox7 {
  margin-left: 515px;
  margin-top: 474px;
}
#chbox8 {
  margin-left: 570px;
  margin-top: 474px;
}

#chbox9 {
  margin-left: 515px;
  margin-top: 540px;
}
#chbox10 {
  margin-left: 570px;
  margin-top: 540px;
}

#chbox11 {
  margin-left: 515px;
  margin-top: 606px;
}
#chbox12 {
  margin-left: 570px;
  margin-top: 606px;
}

#chbox13 {
  margin-left: 515px;
  margin-top: 672px;
}
#chbox14 {
  margin-left: 570px;
  margin-top: 672px;
}
#chbox15 {
  margin-left: 515px;
  margin-top: 738px;
}
#chbox16 {
  margin-left: 570px;
  margin-top: 738px;
}
#chbox17 {
  margin-left: 515px;
  margin-top: 804px;
}
#chbox18 {
  margin-left: 570px;
  margin-top: 804px;
}
.messagecard {
  width: 700px;
  height: 600px;
}
.message3 {
  text-align: center;
}
.sp {
  height: 100px;
}
span {
  font-size: 30px;
}
.guideline {
  border: 5px solid green;
  position: absolute;
  top: 248px;
  left: 492px;
  width: 134px;
  height: 596px;
}
</style>