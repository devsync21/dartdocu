<template>
  <div class="outside" id="pdf">
    <div
      class="back"
      id="pdf2"
      :style="{ backgroundImage: `url(${this.ConsentFormPic})` }"
    >
      <input type="text" name="text1" id="textname" v-model="ptname" />
      <input type="date" name="text2" id="textdate1" v-model="date1" />
      <input type="date" name="text2" id="textdate2" v-model="date2" />

      <input type="text" name="text1" id="textini1" v-model="initail1" />
      <input type="text" name="text1" id="textini2" v-model="initail2" />
      <input type="text" name="text1" id="textini3" v-model="initail3" />
      <input type="text" name="text1" id="textini4" v-model="initail4" />
      <input type="text" name="text1" id="textini5" v-model="initail5" />
      <input type="text" name="text1" id="textini6" v-model="initail6" />
      <input type="text" name="text1" id="textini7" v-model="initail7" />
      <input type="text" name="text1" id="textini8" v-model="initail8" />
      <input type="text" name="text1" id="textini9" v-model="initail9" />
      <input type="text" name="text1" id="textini0" v-model="initail0" />


      <!-- <div class="guideline"></div> -->
      <div class="chcontain">
        <input type="checkbox" id="chbox1" class="ckb" v-model="chb1" />
        <input type="checkbox" id="chbox2" class="ckb" v-model="chb2" />
        <input type="checkbox" id="chbox3" class="ckb" v-model="chb3" />
        <input type="checkbox" id="chbox4" class="ckb" v-model="chb4" />
        <input type="checkbox" id="chbox5" class="ckb" v-model="chb5" />
        <input type="checkbox" id="chbox6" class="ckb" v-model="chb6" />

        <input type="checkbox" id="chbox7" class="ckb" v-model="chb7" />
        <input type="checkbox" id="chbox8" class="ckb" v-model="chb8" />
        <input type="checkbox" id="chbox9" class="ckb" v-model="chb9" />
        <input type="checkbox" id="chbox10" class="ckb" v-model="chb0" />
      </div>
      <div class="initialcontain"></div>

      <canvas
        id="canvas1"
        ref="select"
        width="200px"
        height="40px"
        @mousedown="startPainting"
        @touchstart="startPainting"
        @mouseup="finishedPainting"
        @touchend="finishedPainting"
        @mousemove="mousemove"
        @touchmove="mousemove"
      ></canvas>

      <button id="canvas1reset" @click="canvas1reset()">reset</button>
      <canvas
        id="canvas2"
        ref="select"
        width="200px"
        height="40px"
        @mousedown="startPainting"
        @touchstart="startPainting"
        @mouseup="finishedPainting"
        @touchend="finishedPainting"
        @mousemove="mousemove"
        @touchmove="mousemove"
      ></canvas>
      <button id="canvas2reset" @click="canvas2reset()">reset</button>
    </div>

    <v-btn color="primary" class="mobsubmit" @click="uploadDiv">Submit</v-btn>
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
import ConsentFormPic from "@/assets/ConsentForm.jpg";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import AWS from "aws-sdk";
import moment from "moment";
// import { useRoute } from 'vue-router'

// const route =  useRoute()

// Initialize the Amazon Cognito credentials provider
// AWS.config.region = 'us-east-2'; // Region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-east-2:2b9b6ec0-eff7-4841-939b-31726e96c782',
// });

export default {
  data() {
    return {
      paramId: "",

      ConsentFormPic,
      ctx: null,
      painting: null,
      rect: null,
      clickX: [],
      clickY: [],
      clickDrag: [],
      paint: null,
      onlyFirst: 0,

      IsTouchDevice: false,

      ptname: "",
      initail1:"",
      initail2:"",
      initail3:"",
      initail4:"",
      initail5:"",
      initail6:"",
      initail7:"",
      initail8:"",
      initail9:"",
      initail0:"",
  
      date1: "",
      date2: "",
      chb1: false,
      chb2: false,
      chb3: false,
      chb4: false,
      chb5: false,
      chb6: false,
      chb7: false,
      chb8: false,
      chb9: false,
      chb0: false,

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
    canvas1reset() {
      var c1 = document.getElementById("canvas1");
      this.ctx = c1.getContext("2d");
      this.ctx.clearRect(0, 0, c1.width, c1.height);
      // console.log("canvas1 reset",this.ctx)
    },
    canvas2reset() {
      var c2 = document.getElementById("canvas2");
      this.ctx = c2.getContext("2d");
      this.ctx.clearRect(0, 0, c2.width, c2.height);
      // console.log("canvas2 reset",this.ctx)
    },
    startPainting(e) {
      // if (this.onlyFirst == 0) {
      console.log(e.target.id);
      var canvas = document.getElementById(e.target.id);
      this.ctx = canvas.getContext("2d");
      this.rect = canvas.getBoundingClientRect();
      this.ctx.strokeStyle = "black";
      this.ctx.lineJoin = "round";
      this.ctx.lineWidth = 3;
      this.onlyFirst++;
      // console.log("only");
      // }
      //   console.log("start");
      //   console.log(this.rect.top);
      this.painting = true;

      if (!this.IsTouchDevice) {
        this.addClick(
          e.clientX - this.rect.left,
          e.clientY - this.rect.top,
          true
        );
      } else {
        this.addClick(
          e.touches[0].clientX - this.rect.left,
          e.touches[0].clientY - this.rect.top,
          true
        );
      }

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
        if (!this.IsTouchDevice) {
          this.addClick(
            e.clientX - this.rect.left,
            e.clientY - this.rect.top,
            true
          );
        } else {
          this.addClick(
            e.touches[0].clientX - this.rect.left,
            e.touches[0].clientY - this.rect.top,
            true
          );
        }

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
      // if (this.onlyFirst == 0) {
      //   this.blanksign();
      //   return;
      // }

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
      var photoKey = "consent/" + fn + ".pdf";
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
    },
    paramAnalyzer() {
      console.log("hi", this.$route.params.id);
      if (this.$route.params.id == undefined) {
        // console.log("undefined")
        return;
      }

      var str = this.$route.params.id;

      for (let i = 0; i < str.length; i++) {
        console.log(str[i]);
        var tempstr = "";
        this.tempstr = "chb" + str[i];

        if (this.tempstr == "chb1") {
          this.chb1 = true;
        }
        if (this.tempstr == "chb2") {
          this.chb2 = true;
        }
        if (this.tempstr == "chb3") {
          this.chb3 = true;
        }
        if (this.tempstr == "chb4") {
          this.chb4 = true;
        }
        if (this.tempstr == "chb5") {
          this.chb5 = true;
        }
        if (this.tempstr == "chb6") {
          this.chb6 = true;
        }
        if (this.tempstr == "chb7") {
          this.chb7 = true;
        }
        if (this.tempstr == "chb8") {
          this.chb8 = true;
        }
        if (this.tempstr == "chb9") {
          this.chb9 = true;
        }
        if (this.tempstr == "chb0") {
          this.chb0 = true;
        }
      }
    }
  },
  mounted() {
    // this.paramId = route.params.id
    this.paramAnalyzer();
  },
  watch: {
    savepdf(nd, od) {
      this.saveDiv();
    },
    uploadpdf(nd, od) {
      this.uploadDiv();
    }
  },
  created() {
    this.IsTouchDevice = this.is_touch_device();
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

#canvas1 {
  position: absolute;
  margin-left: 330px;
  margin-top: 900px;

  background-color: ghostwhite;
}
#canvas2 {
  position: absolute;
  margin-left: 330px;
  margin-top: 948px;

  background-color: ghostwhite;
}
#canvas1reset {
  position: absolute;
  margin-left: 540px;
  margin-top: 908px;
  padding: 0px 4px 0px 4px;
  background-color: dodgerblue;
  outline: none;
  color: white;
  border-radius: 3px;
}
#canvas2reset {
  position: absolute;
  margin-left: 540px;
  margin-top: 954px;
  padding: 0px 4px 0px 4px;
  background-color: dodgerblue;
  outline: none;
  color: white;
  border-radius: 3px;
}
#textname {
  position: absolute;
  border: 1px solid green;
  margin-left: 510px;
  margin-top: 105px;
  padding-left: 10px;
}
#textdate1 {
  position: absolute;
  border: 1px solid green;
  margin-left: 644px;
  margin-top: 910px;
  width: 150px;
}
#textdate2 {
  position: absolute;
  border: 1px solid green;
  margin-left: 644px;
  margin-top: 945px;
  width: 150px;
}
#textini1 {
  position: absolute;
  width:100px;
  padding-left: 5px;
  background-color: white;
  border: 1px solid green;
  margin-left: 276px;
  margin-top: 148px;
}
#textini2 {
  position: absolute;
  width:100px;
  padding-left: 5px;
  background-color: white;
  border: 1px solid green;
  margin-left: 214px;
  margin-top: 207px;
}
#textini3 {
  position: absolute;
  width:100px;
  padding-left: 5px;
  background-color: white;
  border: 1px solid green;
  margin-left: 274px;
  margin-top: 332px;
}
#textini4 {
  position: absolute;
  width:100px;
  padding-left: 5px;
  background-color: white;
  border: 1px solid green;
  margin-left: 262px;
  margin-top: 458px;
}
#textini5 {
  position: absolute;
  width:100px;
  padding-left: 5px;
  background-color: white;
  border: 1px solid green;
  margin-left: 232px;
  margin-top: 538px;
}
#textini6 {
  position: absolute;
  width:100px;
  padding-left: 5px;
  background-color: white;
  border: 1px solid green;
  margin-left: 182px;
  margin-top: 690px;
}
#textini7 {
  position: absolute;
  width:100px;
  padding-left: 5px;
  background-color: white;
  border: 1px solid green;
  margin-left: 612px;
  margin-top: 146px;
}
#textini8 {
  position: absolute;
  width:100px;
  padding-left: 5px;
  background-color: white;
  border: 1px solid green;
  margin-left: 574px;
  margin-top: 283px;
}
#textini9 {
  position: absolute;
  width:100px;
  padding-left: 5px;
  background-color: white;
  border: 1px solid green;
  margin-left: 638px;
  margin-top: 506px;
}
#textini0 {
  position: absolute;
  width:100px;
  padding-left: 5px;
  background-color: white;
  border: 1px solid green;
  margin-left: 672px;
  margin-top: 674px;
}






input[type="checkbox"] {
  position: absolute;
  transform: scale(1.5);
}

#chbox1 {
  margin-left: 70px;
  margin-top: 158px;
}
#chbox2 {
  margin-left: 70px;
  margin-top: 218px;
}
#chbox3 {
  margin-left: 70px;
  margin-top: 345px;
}
#chbox4 {
  margin-left: 70px;
  margin-top: 470px;
}
#chbox5 {
  margin-left: 70px;
  margin-top: 550px;
}
#chbox6 {
  margin-left: 70px;
  margin-top: 702px;
}

#chbox7 {
  margin-left: 410px;
  margin-top: 158px;
}
#chbox8 {
  margin-left: 410px;
  margin-top: 296px;
}

#chbox9 {
  margin-left: 410px;
  margin-top: 518px;
}
#chbox10 {
  margin-left: 410px;
  margin-top: 686px;
}
.mobsubmit {
  margin-left: 200px;
  width: 300px;
  min-height: 80px;
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
</style>
