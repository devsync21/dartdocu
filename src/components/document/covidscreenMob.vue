<template>
  <div class="outside" id="pdf">
    Mobile Version
    <div
      class="back"
      id="pdf2"
      :style="{ backgroundImage: `url(${this.covid2})` }"
    >
      <input type="text" name="text1" id="textname" v-model="ptname" />
      <input
        type="date"
        value="2000-01-01"
        name="text2"
        id="textdate"
        v-model="date"
      />
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

      <canvas id="canvas" ref="select" :width="width" height="150px"></canvas>
      <v-btn
        v-show="!signdone"
        class="signbtn"
        color="primary"
        large
        @click="canvas2open"
        >SIGN</v-btn
      >
    </div>

    <v-btn color="primary" class="mobsubmit" @click="uploadDiv">Submit</v-btn>
    <div class="submitbottom"></div>

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
    <v-dialog v-model="canvasdia">
      <v-card :width="width">
        <canvas
          id="canvas2"
          ref="select"
          :width="width"
          height="150px"
          @touchstart="startPainting"
          @touchend="finishedPainting"
          @touchmove="mousemove"
        >
        </canvas>
        <v-btn @click="aftersign(1)">clear</v-btn>
        <v-btn @click="aftersign(2)">Done</v-btn>
      </v-card>
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

      albumBucketName: "dartdocucenter",
      bucketRegion: "us-east-2",
      IdentityPoolId: "us-east-2:2b9b6ec0-eff7-4841-939b-31726e96c782",

      dialog: false,
      dialog2: false,
      message: "Please Wait....   ",
      message2: "We are sending documents to D'Art Dental",
      message3: "",
      status: false,
      mob: false,

      canvasdia: false,
      width: null,
      signdone: false
    };
  },
  computed: {
    ...mapState(["savepdf", "uploadpdf"])
  },
  methods: {
    startPainting(e) {
      e.preventDefault();
      var nf2 = document.getElementById("canvas2");

      if (this.onlyFirst == 0) {
        var canvas = document.getElementById("canvas2");
        this.ctx = canvas.getContext("2d");
        this.rect = canvas.getBoundingClientRect();
        this.ctx.strokeStyle = "black";
        this.ctx.lineJoin = "round";
        this.ctx.lineWidth = 3;
        this.onlyFirst++;
      }

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
    },
    mousemove(e) {
      e.preventDefault();

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
      var element = document.getElementById("pdf2");
      window.scrollTo(0, 0);

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

        doc.save("l.pdf");
      });
    },
    uploadDiv() {
      // if (this.ptname == "dartadmin") {
      //   var pw = prompt("Please enter password");
      //   if (pw == "2875") {
      //     this.$router.push({ name: "admin" });
      //     return;
      //   }
      // }
      if (this.ptname == "") {
        this.blankname();
        console.log("blank name");
        return;
      }
      if (this.onlyFirst == 0) {
        this.blanksign();
        return;
      }
      console.log("upload start");
      var element = document.getElementById("pdf2");

      window.scrollTo(0, 0);

      this.dialog = true;

      // console.log(element, element.scrollWidth, element.scrollHeight);
      html2canvas(element, {
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      }).then(canvas => {
        let imgData = canvas.toDataURL("image/png");

        var doc = new jsPDF("p", "mm");
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();

        doc.addImage(imgData, "PNG", 0, 0, width, height, undefined, "FAST");
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
            return;
          }
          console.log("upload done");
          this.status = !this.status;

          this.message = "Successfully Submitted!";
          this.message2 = "You can finish now. Thank you";
        }
      );
    },
    blankname() {
      console.log("blank name");
      var nf = document.getElementById("textname");

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
    // detectMob() {
    //   if (window.innerWidth <= 800 && window.innerHeight <= 600) {
    //     this.mob = true;
    //   } else {
    //     this.mob = false;
    //   }
    //   return;
    // },
    is_touch_device() {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {
        return false;
      }
    },
    canvas2open() {
      this.canvasdia = true;
      // var nf2 = document.getElementById("canvas2");
      // console.log("Sddd5555", nf2);
      // nf2.style.border = "6px solid red";
    },
    aftersign(index) {
      if (index == 1) {
        var canvas = document.getElementById("canvas2");
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      this.signdone = true;
      this.canvasdia = false;
      var destinationCanvas = document.getElementById("canvas2");
      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");

      //call its drawImage() function passing it the source canvas directly
      ctx.drawImage(destinationCanvas, 0, 0);
    },
    canvas1() {
      this.canvasdia = true;
    }
  },
  mounted() {
    this.width = window.outerWidth;
    console.log("this is mobile screen", this.width);
  },
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
.signbtn {
  position: absolute;
  margin-left: 140px;
  margin-top: 950px;
  width: 300px;
  height: 200px;
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
  height: 28px;
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
.mobsubmit {
  width: 100%;
  min-height: 80px;
}
.canvas2 {
  border: thin solid red;
}
.submitbottom {
  height: 30px;
}
.guideline {
  border: 5px solid green;
  position: absolute;
  top: 270px;
  left: 492px;
  width: 134px;
  height: 596px;
}
</style>