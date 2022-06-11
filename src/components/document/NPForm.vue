<template>
  <div class="outside" id="pdf">
    <!-- <div class="guide">
      <div class="guideTxtBox">
        <span class="guideTxt">{{ guideText }}</span>
      </div>
      <input
        type="text"
        class="guideInput"
        id="guideInputId"
        v-model="guideInputModel"
        @keyup="guideKeyup($event)"
      />
    </div> -->
    <div class="test1" id="testid">
      <!-- *********** Page1  ****************-->
      <div
        class="back"
        id="pdf2"
        :style="{ backgroundImage: `url(${this.NPform1})` }"
      >
        <input
          type="date"
          class="inputPdf"
          id="p1DateToday"
          v-model="pdf1.p1DateToday"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          name="Last Name"
          class="inputPdf"
          id="p1"
          v-model="vm1"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          name="First Name"
          class="inputPdf"
          id="p2"
          v-model="pdf1.fname"
          @change="changeBorder($event)"
        />

        <input
          type="date"
          class="inputPdf"
          id="p1DateBday"
          v-model="pdf1.p1DateBday"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1TxtSSN"
          v-model="pdf1.p1TxtSSN"
          @change="changeBorder($event)"
        />
        <select
          id="p1SelGender"
          class="inputPdf"
          v-model="pdf1.p1SelGender"
          @change="changeBorder($event)"
        >
          <option value="female">F</option>
          <option value="male">M</option>
        </select>
        <input
          type="text"
          class="inputPdf"
          id="p1TxtAdd1"
          v-model="pdf1.p1TxtAdd1"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1TxtAdd2"
          v-model="pdf1.p1TxtAdd2"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1TxtAdd3"
          v-model="pdf1.p1TxtAdd3"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1TxtAdd4"
          v-model="pdf1.p1TxtAdd4"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1TxtPhone1"
          v-model="pdf1.p1TxtPhone1"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1TxtPhone2"
          v-model="pdf1.p1TxtPhone2"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1TxtPhone3"
          v-model="pdf1.p1TxtPhone3"
          @change="changeBorder($event)"
        />

        <div class="chcontain">
          <input type="checkbox" id="chbox1" class="ckb" />
          <input type="checkbox" id="chbox2" class="ckb" />
          <input type="checkbox" id="chbox3" class="ckb" />
        </div>
        <input
          type="text"
          class="inputPdf"
          id="p1TxtEmployer1"
          v-model="pdf1.p1TxtEmployer1"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1TxtEmployer2"
          v-model="pdf1.p1TxtEmployer2"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1TxtEmployer3"
          v-model="pdf1.p1TxtEmployer3"
          @change="changeBorder($event)"
        />
        <input type="checkbox" id="chbox4" class="ckb" />
        <input type="checkbox" id="chbox5" class="ckb" />
        <input type="checkbox" id="chbox6" class="ckb" />
        <input
          type="text"
          class="inputPdf"
          id="p1TxtRefer"
          v-model="pdf1.p1TxtRefer1"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1TxtEmer1"
          v-model="pdf1.p1TxtRefer2"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1TxtEmer2"
          v-model="pdf1.p1TxtRefer3"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1_2_1"
          v-model="pdf1.p1_2_1"
          @change="changeBorder($event)"
        />
        <input type="checkbox" id="chbox7" class="ckb" />
        <input type="checkbox" id="chbox8" class="ckb" />

        <input
          type="text"
          class="inputPdf"
          id="p1_2_2"
          v-model="pdf1.p1_2_2"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1_2_3"
          v-model="pdf1.p1_2_3"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1_2_4"
          v-model="pdf1.p1_2_4"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1_2_5"
          v-model="pdf1.p1_2_5"
          @change="changeBorder($event)"
        />

        <input type="checkbox" id="chbox9" class="ckb" />
        <input type="checkbox" id="chbox10" class="ckb" />
        <input type="checkbox" id="chbox11" class="ckb" />
        <input type="checkbox" id="chbox12" class="ckb" />
        <input type="checkbox" id="chbox13" class="ckb" />

        <input
          type="text"
          class="inputPdf"
          id="p1_3_1"
          v-model="pdf1.p1_3_1"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1_3_2"
          v-model="pdf1.p1_3_2"
          @change="changeBorder($event)"
        />
        <input
          type="date"
          class="inputPdf"
          id="p1_3_3"
          v-model="pdf1.p1_3_3"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1_3_4"
          v-model="pdf1.p1_3_4"
          @change="changeBorder($event)"
        />

        <input
          type="text"
          class="inputPdf"
          id="p1_3_5"
          v-model="pdf1.p1_3_5"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1_3_6"
          v-model="pdf1.p1_3_6"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1_3_7"
          v-model="pdf1.p1_3_7"
          @change="changeBorder($event)"
        />
        <input type="checkbox" id="chbox14" class="ckb" />
        <input type="checkbox" id="chbox15" class="ckb" />
        <input type="checkbox" id="chbox16" class="ckb" />
        <input
          type="text"
          class="inputPdf"
          id="p1_3_8"
          v-model="pdf1.p1_3_8"
          @change="changeBorder($event)"
        />

        <!--  -->
        <input
          type="text"
          class="inputPdf"
          id="p1_3_1c"
          v-model="pdf1.p1_3_1c"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1_3_2c"
          v-model="pdf1.p1_3_2c"
          @change="changeBorder($event)"
        />
        <input
          type="date"
          class="inputPdf"
          id="p1_3_3c"
          v-model="pdf1.p1_3_3c"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1_3_4c"
          v-model="pdf1.p1_3_4c"
          @change="changeBorder($event)"
        />

        <input
          type="text"
          class="inputPdf"
          id="p1_3_5c"
          v-model="pdf1.p1_3_5c"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1_3_6c"
          v-model="pdf1.p1_3_6c"
          @change="changeBorder($event)"
        />
        <input
          type="text"
          class="inputPdf"
          id="p1_3_7c"
          v-model="pdf1.p1_3_7c"
          @change="changeBorder($event)"
        />
        <input type="checkbox" id="chbox14c" class="ckb" />
        <input type="checkbox" id="chbox15c" class="ckb" />
        <input type="checkbox" id="chbox16c" class="ckb" />
        <input
          type="text"
          class="inputPdf"
          id="p1_3_8c"
          v-model="pdf1.p1_3_8c"
          @change="changeBorder($event)"
        />
        <!--  -->
      </div>

      <!-- *********** Page2  ****************-->

      <div
        class="back"
        id="pdf3"
        :style="{ backgroundImage: `url(${this.NPform2})` }"
      >
        <input type="checkbox" id="chbox17" class="ckb" />
        <input type="checkbox" id="chbox18" class="ckb" />
        <input
          type="text"
          class="inputPdf"
          id="p2_1"
          v-model="pdf2.p2_1"
          @change="changeBorder($event)"
        />
        <input type="checkbox" id="chbox19" class="ckb" />
        <input type="checkbox" id="chbox20" class="ckb" />
        <input
          type="text"
          class="inputPdf"
          id="p2_2"
          v-model="pdf2.p2_2"
          @change="changeBorder($event)"
        />
        <input type="checkbox" id="chbox21" class="ckb" />
        <input type="checkbox" id="chbox22" class="ckb" />

        <input type="checkbox" id="chbox23" class="ckb" />
        <input type="checkbox" id="chbox24" class="ckb" />
        <input
          type="text"
          class="inputPdf"
          id="p2_3"
          v-model="pdf2.p2_3"
          @change="changeBorder($event)"
        />

        <input type="checkbox" id="chbox25" class="ckb" />
        <input type="checkbox" id="chbox26" class="ckb" />
        <input
          type="text"
          class="inputPdf"
          id="p2_4"
          v-model="pdf2.p2_4"
          @change="changeBorder($event)"
        />
        <input type="checkbox" id="chboxM1" class="ckb" />
        <input type="checkbox" id="chboxM2" class="ckb" />
        <input type="checkbox" id="chboxM3" class="ckb" />
        <input type="checkbox" id="chboxM4" class="ckb" />
        <input type="checkbox" id="chboxM5" class="ckb" />

        <input type="checkbox" id="chboxM6" class="ckb" />
        <input type="checkbox" id="chboxM7" class="ckb" />
        <input type="checkbox" id="chboxM8" class="ckb" />
        <input type="checkbox" id="chboxM9" class="ckb" />
        <input type="checkbox" id="chboxM10" class="ckb" />

        <input type="checkbox" id="chboxM11" class="ckb" />
        <input type="checkbox" id="chboxM12" class="ckb" />
        <input type="checkbox" id="chboxM13" class="ckb" />
        <input type="checkbox" id="chboxM14" class="ckb" />
        <input type="checkbox" id="chboxM15" class="ckb" />

        <input type="checkbox" id="chboxM16" class="ckb" />
        <input type="checkbox" id="chboxM17" class="ckb" />
        <input type="checkbox" id="chboxM18" class="ckb" />
        <input type="checkbox" id="chboxM19" class="ckb" />
        <input type="checkbox" id="chboxM20" class="ckb" />

        <input type="checkbox" id="chboxM21" class="ckb" />
        <input type="checkbox" id="chboxM22" class="ckb" />
        <input type="checkbox" id="chboxM23" class="ckb" />
        <input type="checkbox" id="chboxM24" class="ckb" />
        <input type="checkbox" id="chboxM25" class="ckb" />

        <input type="checkbox" id="chboxM26" class="ckb" />
        <input type="checkbox" id="chboxM27" class="ckb" />
        <input type="checkbox" id="chboxM28" class="ckb" />
        <input type="checkbox" id="chboxM29" class="ckb" />
        <input type="checkbox" id="chboxM30" class="ckb" />

        <input type="checkbox" id="chboxM31" class="ckb" />
        <input type="checkbox" id="chboxM32" class="ckb" />
        <input type="checkbox" id="chboxM33" class="ckb" />
        <input type="checkbox" id="chboxM34" class="ckb" />
        <input type="checkbox" id="chboxM35" class="ckb" />

        <input type="checkbox" id="chboxM36" class="ckb" />
        <input type="checkbox" id="chboxM37" class="ckb" />
        <input type="checkbox" id="chboxM38" class="ckb" />
        <input type="checkbox" id="chboxM39" class="ckb" />
        <input type="checkbox" id="chboxM40" class="ckb" />

        <input type="checkbox" id="chboxM41" class="ckb" />
        <input type="checkbox" id="chboxM42" class="ckb" />
        <input type="checkbox" id="chboxM43" class="ckb" />
        <input type="checkbox" id="chboxM44" class="ckb" />
        <input type="checkbox" id="chboxM45" class="ckb" />

        <input type="checkbox" id="chboxM46" class="ckb" />
        <input type="checkbox" id="chboxM47" class="ckb" />
        <input type="checkbox" id="chboxM48" class="ckb" />
        <input type="checkbox" id="chboxM49" class="ckb" />
        <input type="checkbox" id="chboxM50" class="ckb" />

        <input
          type="text"
          class="inputPdf"
          id="p2_5"
          v-model="pdf2.p2_5"
          @change="changeBorder($event)"
        />
        <input type="checkbox" id="chboxM51" class="ckb" />
        <input type="checkbox" id="chboxM52" class="ckb" />
        <input type="checkbox" id="chboxM53" class="ckb" />
        <input type="checkbox" id="chboxM54" class="ckb" />

        <input
          type="text"
          class="inputPdf"
          id="p2_6"
          v-model="pdf2.p2_6"
          @change="changeBorder($event)"
        />
        <input type="checkbox" id="chboxM55" class="ckb" />
        <input type="checkbox" id="chboxM56" class="ckb" />

        <canvas
          id="canvas1"
          ref="select"
          width="280px"
          height="36px"
          @mousedown="startPainting"
          @touchstart="startPainting"
          @mouseup="finishedPainting"
          @touchend="finishedPainting"
          @mousemove="mousemove"
          @touchmove="mousemove"
        ></canvas>
        <button id="canvas1reset" @click="canvas1reset()">reset</button>
        <input
          type="date"
          class="inputPdf"
          id="p2_7"
          v-model="pdf2.p2_7"
          @change="changeBorder($event)"
        />
        <canvas
          id="canvas2"
          ref="select"
          width="280px"
          height="36px"
          @mousedown="startPainting"
          @touchstart="startPainting"
          @mouseup="finishedPainting"
          @touchend="finishedPainting"
          @mousemove="mousemove"
          @touchmove="mousemove"
        ></canvas>
        <button id="canvas2reset" @click="canvas2reset()">reset</button>
        <input
          type="date"
          class="inputPdf"
          id="p2_8"
          v-model="pdf2.p2_8"
          @change="changeBorder($event)"
        />
      </div>
      <!-- *********** Page3  ****************-->

      <div
        class="back"
        id="pdf4"
        :style="{ backgroundImage: `url(${this.NPform3})` }"
      >
        <canvas
          id="canvas3"
          ref="select"
          width="280px"
          height="30px"
          @mousedown="startPainting"
          @touchstart="startPainting"
          @mouseup="finishedPainting"
          @touchend="finishedPainting"
          @mousemove="mousemove"
          @touchmove="mousemove"
        ></canvas>
        <button id="canvas3reset" @click="canvas3reset()">reset</button>
        <input
          type="date"
          class="inputPdf"
          id="p3_1"
          v-model="pdf2.p3_1"
          @change="changeBorder($event)"
        />
      </div>
    </div>

    <!-- *********** Dialog: finish  ****************-->

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
import NPform1 from "@/assets/NPform1.jpg";
import NPform2 from "@/assets/NPform2.jpg";
import NPform3 from "@/assets/NPform3.jpg";

import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";
import AWS from "aws-sdk";
import moment from "moment";

import NPFormMixin from "@/components/document/mixin/NPFormMixin.js";
import NPFormConMixin from "@/components/document/mixin/NPFormConMixin.js";

export default {
  mixins: [NPFormMixin, NPFormConMixin],
  data() {
    return {
      //   covid2,
      NPform1,
      NPform2,
      NPform3,
      ctx: null,
      painting: null,
      rect: null,
      clickX: [],
      clickY: [],
      clickDrag: [],
      paint: null,
      onlyFirst: 0,
      pdfToSave: null,

      rotationNum: 0,
      thisPDF: null,
      thisEl: null,

      showpart: 1,
      //   ptlname: "",
      vm: [],
      vm1: "",
      ptfname: "",
      pdf1: {
        p1DateToday: "",
        p1DateBday: "",
        p1TxtSSN: ""
      },
      pdf2: {},
      guideText: "this is jsut test",
      guideInputModel: "",
      currentInput: null,

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
    changeBorder(event) {
      if (event.target._value != "") {
        event.target.style.border = "thin hidden blue";
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

.inputPdf {
  outline: none;
  border: 2px solid orange;
  position: absolute;
}
#p1 {
  height: 22px;
  margin-left: 170px;
  margin-top: 205px;
}
#p2 {
  height: 22px;
  margin-left: 170px;
  margin-top: 229px;
}

#p1DateToday {
  margin-left: 564px;
  margin-top: 137px;
  width: 150px;
}
#p1DateBday {
  margin-left: 584px;
  margin-top: 204px;
  height: 24px;
  width: 150px;
  background-color: white;
}
#p1TxtSSN {
  height: 24px;
  margin-left: 520px;
  margin-top: 229px;
  width: 130px;
}
#p1SelGender {
  margin-left: 700px;
  margin-top: 229px;
  width: 30px;
  height: 24px;
  background-color: white;
}
#p1TxtAdd1 {
  height: 22px;
  margin-left: 170px;
  margin-top: 253px;
  width: 263px;
}
#p1TxtAdd2 {
  height: 22px;
  margin-left: 170px;
  margin-top: 276px;
  width: 263px;
}
#p1TxtAdd3 {
  height: 22px;
  width: 100px;
  margin-left: 170px;
  margin-top: 298px;
}
#p1TxtAdd4 {
  height: 22px;
  width: 100px;
  margin-left: 330px;
  margin-top: 298px;
}
#p1TxtPhone1 {
  height: 22px;
  margin-left: 520px;
  margin-top: 251px;
  width: 200px;
}
#p1TxtPhone2 {
  height: 22px;
  margin-left: 520px;
  margin-top: 274px;
  width: 200px;
}
#p1TxtPhone3 {
  height: 22px;
  margin-left: 520px;
  margin-top: 297px;
  width: 200px;
}
#chbox1 {
  margin-left: 136px;
  margin-top: 325px;
}
#chbox2 {
  margin-left: 196px;
  margin-top: 325px;
}
#chbox3 {
  margin-left: 258px;
  margin-top: 325px;
}
#p1TxtEmployer1 {
  height: 22px;
  margin-left: 183px;
  margin-top: 343px;
  width: 200px;
}
#p1TxtEmployer2 {
  height: 22px;
  margin-left: 533px;
  margin-top: 343px;
  width: 180px;
}
#p1TxtEmployer3 {
  height: 22px;
  margin-left: 183px;
  margin-top: 365px;
  width: 530px;
}
#chbox4 {
  margin-left: 297px;
  margin-top: 392px;
}
#chbox5 {
  margin-left: 412px;
  margin-top: 392px;
}
#chbox6 {
  margin-left: 525px;
  margin-top: 392px;
}
#p1TxtRefer {
  height: 22px;
  margin-left: 577px;
  margin-top: 389px;
  width: 130px;
  background-color: white;
}
#p1TxtEmer1 {
  height: 22px;
  margin-left: 370px;
  margin-top: 411px;
  width: 130px;
  background-color: white;
}
#p1TxtEmer2 {
  height: 22px;
  margin-left: 577px;
  margin-top: 411px;
  width: 130px;
  background-color: white;
}
#p1_2_1 {
  height: 22px;
  margin-left: 277px;
  margin-top: 483px;
  width: 450px;
}
#chbox7 {
  margin-left: 333px;
  margin-top: 508px;
}
#chbox8 {
  margin-left: 393px;
  margin-top: 508px;
}
#p1_2_2 {
  height: 22px;
  margin-left: 307px;
  margin-top: 528px;
  width: 130px;
}
#p1_2_3 {
  height: 22px;
  margin-left: 558px;
  margin-top: 528px;
  width: 130px;
}
#p1_2_4 {
  height: 22px;
  margin-left: 307px;
  margin-top: 551px;
  width: 130px;
}
#p1_2_5 {
  height: 22px;
  margin-left: 585px;
  margin-top: 551px;
  width: 130px;
}
#chbox9 {
  margin-left: 77px;
  margin-top: 598px;
}
#chbox10 {
  margin-left: 194px;
  margin-top: 598px;
}
#chbox11 {
  margin-left: 292px;
  margin-top: 598px;
}
#chbox12 {
  margin-left: 378px;
  margin-top: 598px;
}
#chbox13 {
  margin-left: 490px;
  margin-top: 598px;
}

#p1_3_1 {
  height: 22px;
  margin-left: 242px;
  margin-top: 682px;
  width: 190px;
}
#p1_3_2 {
  height: 22px;
  margin-left: 588px;
  margin-top: 682px;
  width: 140px;
}
#p1_3_3 {
  height: 22px;
  margin-left: 242px;
  margin-top: 706px;
  width: 140px;
  background-color: white;
}
#p1_3_4 {
  height: 22px;
  margin-left: 520px;
  margin-top: 706px;
  width: 200px;
}

#p1_3_5 {
  height: 22px;
  margin-left: 242px;
  margin-top: 729px;
  width: 190px;
}
#p1_3_6 {
  height: 22px;
  margin-left: 520px;
  margin-top: 729px;
  width: 200px;
}
#p1_3_7 {
  height: 22px;
  margin-left: 242px;
  margin-top: 752px;
  width: 190px;
}
#chbox14 {
  margin-left: 524px;
  margin-top: 753px;
}
#chbox15 {
  margin-left: 565px;
  margin-top: 753px;
}
#chbox16 {
  margin-left: 613px;
  margin-top: 753px;
}
#p1_3_8 {
  height: 22px;
  margin-left: 242px;
  margin-top: 774px;
  width: 380px;
}

#p1_3_1c {
  height: 22px;
  margin-left: 242px;
  margin-top: 830px;
  width: 190px;
}
#p1_3_2c {
  height: 22px;
  margin-left: 588px;
  margin-top: 830px;
  width: 140px;
}
#p1_3_3c {
  height: 22px;
  margin-left: 242px;
  margin-top: 854px;
  width: 140px;
  background-color: white;
}
#p1_3_4c {
  height: 22px;
  margin-left: 520px;
  margin-top: 853px;
  width: 200px;
}

#p1_3_5c {
  height: 22px;
  margin-left: 242px;
  margin-top: 876px;
  width: 190px;
}
#p1_3_6c {
  height: 22px;
  margin-left: 520px;
  margin-top: 876px;
  width: 200px;
}
#p1_3_7c {
  height: 22px;
  margin-left: 242px;
  margin-top: 899px;
  width: 190px;
}
#chbox14c {
  margin-left: 524px;
  margin-top: 900px;
}
#chbox15c {
  margin-left: 565px;
  margin-top: 900px;
}
#chbox16c {
  margin-left: 613px;
  margin-top: 900px;
}
#p1_3_8c {
  height: 22px;
  margin-left: 242px;
  margin-top: 921px;
  width: 380px;
}
///////////////////page 2
#chbox17 {
  margin-left: 257px;
  margin-top: 100px;
}
#chbox18 {
  margin-left: 308px;
  margin-top: 100px;
}
#p2_1 {
  height: 22px;
  margin-left: 142px;
  margin-top: 115px;
  width: 500px;
}
#chbox19 {
  margin-left: 258px;
  margin-top: 143px;
}
#chbox20 {
  margin-left: 308px;
  margin-top: 143px;
}
#p2_2 {
  height: 22px;
  margin-left: 168px;
  margin-top: 158px;
  width: 500px;
}
#chbox21 {
  margin-left: 438px;
  margin-top: 198px;
}
#chbox22 {
  margin-left: 488px;
  margin-top: 198px;
}
#chbox23 {
  margin-left: 380px;
  margin-top: 232px;
}
#chbox24 {
  margin-left: 430px;
  margin-top: 232px;
}
#p2_3 {
  height: 22px;
  margin-left: 148px;
  margin-top: 250px;
  width: 500px;
}

#chbox25 {
  margin-left: 425px;
  margin-top: 289px;
}
#chbox26 {
  margin-left: 475px;
  margin-top: 289px;
}
#p2_4 {
  height: 22px;
  margin-left: 148px;
  margin-top: 315px;
  width: 500px;
}
/////////
#chboxM1 {
  margin-left: 33px;
  margin-top: 364px;
}
#chboxM2 {
  margin-left: 163px;
  margin-top: 364px;
}
#chboxM3 {
  margin-left: 270px;
  margin-top: 364px;
}
#chboxM4 {
  margin-left: 428px;
  margin-top: 364px;
}
#chboxM5 {
  margin-left: 552px;
  margin-top: 364px;
}

#chboxM6 {
  margin-left: 33px;
  margin-top: 384px;
}
#chboxM7 {
  margin-left: 163px;
  margin-top: 384px;
}
#chboxM8 {
  margin-left: 270px;
  margin-top: 384px;
}
#chboxM9 {
  margin-left: 428px;
  margin-top: 384px;
}
#chboxM10 {
  margin-left: 552px;
  margin-top: 384px;
}

#chboxM11 {
  margin-left: 33px;
  margin-top: 404px;
}
#chboxM12 {
  margin-left: 163px;
  margin-top: 404px;
}
#chboxM13 {
  margin-left: 270px;
  margin-top: 404px;
}
#chboxM14 {
  margin-left: 428px;
  margin-top: 404px;
}
#chboxM15 {
  margin-left: 552px;
  margin-top: 404px;
}

#chboxM16 {
  margin-left: 33px;
  margin-top: 424px;
}
#chboxM17 {
  margin-left: 163px;
  margin-top: 424px;
}
#chboxM18 {
  margin-left: 270px;
  margin-top: 424px;
}
#chboxM19 {
  margin-left: 428px;
  margin-top: 424px;
}
#chboxM20 {
  margin-left: 552px;
  margin-top: 424px;
}

#chboxM21 {
  margin-left: 33px;
  margin-top: 444px;
}
#chboxM22 {
  margin-left: 163px;
  margin-top: 444px;
}
#chboxM23 {
  margin-left: 270px;
  margin-top: 444px;
}
#chboxM24 {
  margin-left: 428px;
  margin-top: 444px;
}
#chboxM25 {
  margin-left: 552px;
  margin-top: 444px;
}
#chboxM26 {
  margin-left: 33px;
  margin-top: 464px;
}
#chboxM27 {
  margin-left: 163px;
  margin-top: 464px;
}
#chboxM28 {
  margin-left: 270px;
  margin-top: 464px;
}
#chboxM29 {
  margin-left: 428px;
  margin-top: 464px;
}
#chboxM30 {
  margin-left: 552px;
  margin-top: 464px;
}

#chboxM31 {
  margin-left: 33px;
  margin-top: 484px;
}
#chboxM32 {
  margin-left: 163px;
  margin-top: 484px;
}
#chboxM33 {
  margin-left: 270px;
  margin-top: 484px;
}
#chboxM34 {
  margin-left: 428px;
  margin-top: 484px;
}
#chboxM35 {
  margin-left: 552px;
  margin-top: 484px;
}
#chboxM36 {
  margin-left: 33px;
  margin-top: 504px;
}
#chboxM37 {
  margin-left: 163px;
  margin-top: 504px;
}
#chboxM38 {
  margin-left: 270px;
  margin-top: 504px;
}
#chboxM39 {
  margin-left: 428px;
  margin-top: 504px;
}
#chboxM40 {
  margin-left: 552px;
  margin-top: 504px;
}

#chboxM41 {
  margin-left: 33px;
  margin-top: 553px;
}
#chboxM42 {
  margin-left: 163px;
  margin-top: 553px;
}
#chboxM43 {
  margin-left: 270px;
  margin-top: 553px;
}
#chboxM44 {
  margin-left: 428px;
  margin-top: 553px;
}
#chboxM45 {
  margin-left: 552px;
  margin-top: 553px;
}
#chboxM46 {
  margin-left: 33px;
  margin-top: 573px;
}
#chboxM47 {
  margin-left: 163px;
  margin-top: 573px;
}
#chboxM48 {
  margin-left: 270px;
  margin-top: 573px;
}
#chboxM49 {
  margin-left: 428px;
  margin-top: 573px;
}
#chboxM50 {
  margin-left: 552px;
  margin-top: 573px;
}

#p2_5 {
  height: 22px;
  margin-left: 600px;
  margin-top: 568px;
  width: 90px;
}
#chboxM51 {
  margin-left: 552px;
  margin-top: 573px;
}
#chboxM51 {
  margin-left: 338px;
  margin-top: 602px;
}
#chboxM52 {
  margin-left: 390px;
  margin-top: 602px;
}
#chboxM53 {
  margin-left: 262px;
  margin-top: 619px;
}
#chboxM54 {
  margin-left: 312px;
  margin-top: 619px;
}
#p2_6 {
  height: 22px;
  margin-left: 442px;
  margin-top: 614px;
  width: 250px;
}
#chboxM55 {
  margin-left: 262px;
  margin-top: 638px;
}
#chboxM56 {
  margin-left: 310px;
  margin-top: 638px;
}
#canvas1 {
  position: absolute;
  margin-left: 80px;
  margin-top: 713px;
  border: thin solid green;

  background-color: ghostwhite;
}
#canvas1reset {
  position: absolute;
  margin-left: 367px;
  margin-top: 720px;
  padding: 0px 4px 0px 4px;
  background-color: dodgerblue;
  outline: none;
  color: white;
  border-radius: 3px;
}
#p2_7 {
  height: 22px;
  margin-left: 442px;
  margin-top: 724px;
  width: 150px;
}
#canvas2 {
  position: absolute;
  margin-left: 80px;
  margin-top: 890px;
  border: thin solid green;

  background-color: ghostwhite;
}
#canvas2reset {
  position: absolute;
  margin-left: 367px;
  margin-top: 897px;
  padding: 0px 4px 0px 4px;
  background-color: dodgerblue;
  outline: none;
  color: white;
  border-radius: 3px;
}
#p2_8 {
  height: 22px;
  margin-left: 442px;
  margin-top: 900px;
  width: 150px;
}

#canvas3 {
  position: absolute;
  margin-left: 80px;
  margin-top: 902px;
  border: thin solid green;

  background-color: ghostwhite;
}
#canvas3reset {
  position: absolute;
  margin-left: 367px;
  margin-top: 904px;
  padding: 0px 4px 0px 4px;
  background-color: dodgerblue;
  outline: none;
  color: white;
  border-radius: 3px;
}
#p3_1 {
  height: 22px;
  margin-left: 442px;
  margin-top: 905px;
  width: 150px;
}
//////////////////
input[type="checkbox"] {
  position: absolute;
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
.guide {
  position: fixed;
  width: 850px;
  height: 200px;
  background-color: rgb(185, 220, 255);
  border-radius: 20px;
  bottom: 20px;
  left: 260px;
  z-index: 5;
}
.guideTxtBox {
  margin: 30px 0px 0px 80px;
}
.guideTxt {
  font-size: 30px;
}
.guideInput {
  width: 300px;
  background-color: white;
  border: thin solid green;
  outline: none;
  border-radius: 20px;
  height: 50px;
  width: 600px;
  margin: 20px 0px 0px 50px;
}
</style>