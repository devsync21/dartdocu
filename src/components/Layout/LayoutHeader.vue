<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-show="!mob"
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list>
        <v-btn
          class="savePDF ml-6 mt-6 mb-6"
          x-large
          rounded
          color="primary"
          width="200px"
          @click="sendtodart()"
          >SUBMIT</v-btn
        >
        <!-- <v-btn
          class="savePDF ml-6 mt-3"
          x-large
          rounded
          color="primary"
          width="200px"
          @click="savetopdf()"
          >SAVE ON DEVICE</v-btn
        > -->

        <v-subheader>SELECT DOCUMENTS</v-subheader>

        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            @click="ClickDocu(item, i)"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">D'Art Dental Documents</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon @click="dia = true">
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>
      <v-btn icon @click="goadmin">
        <v-icon>mdi-account-circle-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <div class="vmain">
        <table class="content">
          <tr>
            <td class="routercontent">
              <router-view />
            </td>
          </tr>
        </table>

        <!-- <div>
          <router-view />
        </div> -->
      </div>
    </v-main>
    <v-dialog v-model="dia" width="400px">
      <v-card max-width="400px" height="300px">
        <div class="sp"></div>
        <v-card-text class="text--primary">
          <div class="hel">
            <span> For any Question,</span> <br />
            <br />
            <span> Please call D'Art Dental at </span> <br />
            <br />
            <span>972-424-8023</span>
          </div>
        </v-card-text>
      </v-card>
      <v-btn color="primary" class="btnclose" @click="dia = false">Close</v-btn>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    dia: false,
    items: [
      {
        icon: "mdi-text-box-outline",
        text: "Covid - Pre Screening",
        to: "covid"
      },
      {
        icon: "mdi-text-box-outline",
        text: "Covid - In Office",
        to: "covidoffice"
      },
      {
        icon: "mdi-text-box-outline",
        text: "New Patient Form",
        to: "npform"
      }
    ]
  }),
  computed: {
    ...mapState(["mob"])
  },
  methods: {
    savetopdf() {
      this.$store.dispatch("SaveToPdf");
    },
    ClickDocu(item, index) {
      console.log(item, index);
      this.$router.push({ name: item.to });
    },
    sendtodart() {
      this.$store.dispatch("upPdf");
    },
    goadmin() {
      this.$router.push({ name: "admin" });
      // var pw = prompt("Please enter password");
      // if (pw == "2875") {
      //   this.$router.push({ name: "admin" });
      //   return;
      // }
    }
  }
};
</script>

<style scoped>
.vmain {
  padding: 10px 0px 0px 10px;
}
table {
  width: 100%;
  height: 100%;
}
.sp {
  height: 80px;
}
span {
  font-size: 20px;
}
.hel {
  text-align: center;
}
</style>