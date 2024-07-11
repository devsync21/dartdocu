<template>
  <div>
    <h2>X: Delete V:download O:Copy to Saved</h2>
    <v-row>
      <v-col cols="6">
        <!-- COVID - PRE SCREENING
        <table>
          <tr v-for="(file, index) in filelist" :key="file.Key">
            <td>{{ index + 1 }}</td>

            <td>{{ namecom(file.Key)[0] }}</td>
            <td>{{ namecom(file.Key)[1] }}</td>

            <td>
              <v-btn @click="deletefile(file.Key)" color="red" text icon
                >x</v-btn
              >
              <v-btn
                @click="downloadObj(file.Key, file)"
                color="green"
                text
                icon
                >v</v-btn
              >
              <v-btn @click="copyToSave(file.Key, file)" color="blue" text icon
                >O</v-btn
              >
            </td>
          </tr>
        </table> -->

        <!-- <div class="space"></div> -->
        CONSENT FORM
        <table>
          <tr v-for="(file, index) in filelistInOffice" :key="file.Key">
            <td>{{ index + 1 }}</td>

            <td>{{ namecom(file.Key)[0] }}</td>
            <td>{{ namecom(file.Key)[1] }}</td>

            <td>
              <v-btn @click="deletefile(file.Key)" color="red" text icon
                >X</v-btn
              >
              <v-btn
                @click="downloadObj(file.Key, file)"
                color="green"
                text
                icon
                >V</v-btn
              >
              <v-btn @click="copyToSave(file.Key, file)" color="blue" text icon
                >O</v-btn
              >
            </td>
          </tr>
        </table>

        <!--  -->
        <div class="space"></div>
        NP FORM
        <table>
          <tr v-for="(file, index) in filelistNP" :key="file.Key">
            <td>{{ index + 1 }}</td>

            <td>{{ namecom(file.Key)[0] }}</td>
            <td>{{ namecom(file.Key)[1] }}</td>

            <td>
              <v-btn @click="deletefile(file.Key)" color="red" text icon
                >X</v-btn
              >
              <v-btn
                @click="downloadObj(file.Key, file)"
                color="green"
                text
                icon
                >V</v-btn
              >
              <v-btn
                @click="copyToSaveNP(file.Key, file)"
                color="blue"
                text
                icon
                >O</v-btn
              >
            </td>
          </tr>
        </table>

        <!--  -->
      </v-col>
      <v-col cols="6">
        <div class="title">
          COVID SAVED ( Total :{{ lenSaved }} )
          <input
            type="text"
            class="searchbox"
            placeholder="  search here"
            v-model="keyword"
            @keyup="keySearch"
          />
        </div>
        <div class="saved">
          <table class="savetable">
            <tr v-for="(file, index) in filelistSAVED" :key="file.Key">
              <td>{{ index + 1 }}</td>

              <td>{{ namecom(file.Key)[0] }}</td>
              <td>{{ namecom(file.Key)[1] }}</td>

              <td>
                <v-btn @click="deletefile(file.Key)" color="red" text icon
                  >X</v-btn
                >
                <v-btn
                  @click="downloadObj(file.Key, file)"
                  color="green"
                  text
                  icon
                  >V</v-btn
                >
              </td>
            </tr>
          </table>
        </div>
        <div class="space2"></div>
        <!--  -->
        <div class="title">NP FORM SAVED ( Total :{{ lenSavedNP }} )</div>
        <div class="saved">
          <table class="savetable">
            <tr v-for="(file, index) in filelistSAVEDNP" :key="file.Key">
              <td>{{ index + 1 }}</td>

              <td>{{ namecom(file.Key)[0] }}</td>
              <td>{{ namecom(file.Key)[1] }}</td>

              <td>
                <v-btn @click="deletefile(file.Key)" color="red" text icon
                  >X</v-btn
                >
                <v-btn
                  @click="downloadObj(file.Key, file)"
                  color="green"
                  text
                  icon
                  >V</v-btn
                >
              </td>
            </tr>
          </table>
        </div>
        <!--  -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AWS from "aws-sdk";
import fs from "fs";
import * as jsPDF from "jspdf";

export default {
  data() {
    return {
      albumBucketName: "dartdocucenter",
      bucketRegion: "us-east-2",
      IdentityPoolId: "us-east-2:2b9b6ec0-eff7-4841-939b-31726e96c782",

      filelist: null,
      filelistInOffice: null,
      filelistNP: null,
      filelistSAVED: null,
      filelistSAVED2: null,
      filelistSAVEDNP: null,
      keyword: ""
      // lenSaved: ""
    };
  },
  computed: {
    lenSaved() {
      if (this.filelistSAVED == null) {
        return;
      }
      return this.filelistSAVED.length;
    },
    lenSavedNP() {
      if (this.filelistSAVEDNP == null) {
        return;
      }
      return this.filelistSAVEDNP.length;
    }
  },

  methods: {
    keySearch() {
      // console.log(this.keyword);
      this.filelistSAVED = this.filelistSAVED2.filter(x => {
        var str2 = x.Key.substring(6, x.Key.length - 15);
        var str3 = str2.split("-");
        return str3[1].toUpperCase().indexOf(this.keyword.toUpperCase()) != -1;
      });
    },
    namecom: function(str) {
      // console.log(typeof str, str);
      var str2 = str.substring(6, str.length - 15);

      var str3 = str2.split("-");

      return str3;
    },
    listAlbums() {
      this.keyword = "";
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

      s3.listObjects({ Prefix: "covid-Pre/" }, (err, data) => {
        if (err) {
          // console.log(err.message);
          return;
        } else {
          // console.log("success", data.Contents);
          this.filelist = data.Contents;
        }
      });

      s3.listObjects({ Prefix: "consent/" }, (err, data) => {
        if (err) {
          // console.log(err.message);
          return;
        } else {
          // console.log("success", data.Contents);
          this.filelistInOffice = data.Contents;
        }
      });

      s3.listObjects({ Prefix: "NPform/" }, (err, data) => {
        if (err) {
          // console.log(err.message);
          return;
        } else {
          // console.log("success", data.Contents);
          this.filelistNP = data.Contents;
        }
      });

      s3.listObjects({ Prefix: "Saved/" }, (err, data) => {
        if (err) {
          console.log(err.message);
          return;
        } else {
          // console.log("success", data.Contents);
          this.filelistSAVED = data.Contents;
          this.filelistSAVED2 = data.Contents;
          // console.log("!!!", this.filelistSAVED);
          this.filelistSAVED.sort(this.compare);
        }
      });

      s3.listObjects({ Prefix: "SavedNP/" }, (err, data) => {
        if (err) {
          console.log(err.message);
          return;
        } else {
          // console.log("success", data.Contents);
          this.filelistSAVEDNP = data.Contents;
        }
      });
    },
    compare(a, b) {
      if (a.Key < b.Key) {
        return 1;
      }
      if (a.Key > b.Key) {
        return -1;
      }
      return 0;
    },
    deletefile(key) {
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

      s3.deleteObject({ Key: key }, (err, data) => {
        if (err) {
          console.log("There was an error: ", err.message);
          return;
        }
        // console.log("success", data);
        this.listAlbums();
      });
    },
    downloadObj(key, files) {
      // console.log(files);
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

      var baseurl = "https://dartdocucenter.s3.us-east-2.amazonaws.com/";
      // console.log(key, files);

      var element = document.createElement("a");

      element.setAttribute("href", baseurl + key);
      element.setAttribute("download", key);
      // console.log("key", key);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    copyToSave(key, file) {
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
      console.log(key, file);
      var opf = key.split("/");
      var oldPrefix = opf[0];
      var newPrefix = "Saved";

      var params = {
        Bucket: this.albumBucketName,
        CopySource: this.albumBucketName + "/" + key,
        Key: file.Key.replace(oldPrefix, newPrefix)
      };
      s3.copyObject(params, (copyErr, copyData) => {
        if (copyErr) {
          console.log(copyErr);
        } else {
          console.log("Copied: ", params.Key);
          this.deletefile(key);
        }
      });
    },
    copyToSaveNP(key, file) {
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
      console.log(key, file);
      var opf = key.split("/");
      var oldPrefix = opf[0];
      var newPrefix = "SavedNP";

      var params = {
        Bucket: this.albumBucketName,
        CopySource: this.albumBucketName + "/" + key,
        Key: file.Key.replace(oldPrefix, newPrefix)
      };
      s3.copyObject(params, (copyErr, copyData) => {
        if (copyErr) {
          console.log(copyErr);
        } else {
          console.log("Copied: ", params.Key);
          this.deletefile(key);
        }
      });
    },
    refreshall() {
      this.listAlbums();
    }
  },
  watch: {
    keyword(nd, od) {
      this.keySearch();
    }
  },

  mounted() {
    var pw = prompt("Admin Page: Please enter password");
    if (pw == "2875") {
      this.listAlbums();
      return;
    } else {
      this.$router.push({ name: "home" });
    }
    // this.listAlbums();
  }
};
</script>

<style scoped>
table {
  width: 90%;
  border-collapse: collapse;
}
td {
  padding: 1px 5px 1px 20px;
  border: thin solid dodgerblue;
}
tr:hover {
  background-color: rgb(134, 134, 134, 0.3);
}
.space {
  height: 100px;
}
.space2 {
  height: 30px;
}
.savetable {
  width: 100%;
  margin-right: 200px;
}
.saved {
  width: 90%;
  height: 300px;
  overflow-y: auto;
  border: thin solid black;
}
.searchbox {
  border: thin solid green;
  margin-left: 30px;
}
.title {
  padding: 2px;
}
</style>
