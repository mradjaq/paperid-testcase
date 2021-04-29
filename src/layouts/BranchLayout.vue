<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="text-white">
      <div class="bg-primary flex center-item" style="height: 80px">
        <q-btn
          stretch
          flat
          to="/home"
          @click="$store.commit('log/clearTimeExecution')"
        >
          <img
            src="~assets/img/logo-bri-nds-32px.svg"
            alt="NDS"
            height="50px"
            style="margin-left: 5%"
          />
        </q-btn>
      </div>

      <div class="row gt-sm bg-grey-1">
        <q-toolbar
          class="col-12 col-md-6 text-capitalize text-primary q-pl-xl"
          style="z-index: 9999"
        >
          <q-btn
            stretch
            flat
            no-wrap
            icon="o_home"
            to="/home"
            :class="{
              'bg-light-blue': isHome() && !listOther,
              'text-white': isHome() && !listOther,
            }"
            @click="$store.commit('log/clearTimeExecution')"
          />
          <template v-for="(m, idx) in visibleMenu">
            <q-btn
              :key="idx"
              stretch
              flat
              no-wrap
              :label="m.label"
              :name="`btn${m.label}`"
              :icon="`img:${m.icon}`"
              :to="`/home/${m.label}`"
              :class="{
                'text-white': isActiveMenu(m.to, m.label) && !listOther,
                'bg-secondary': isActiveMenu(m.to, m.label) && !listOther,
              }"
            />
            <q-separator :key="m.id" vertical />
          </template>
          <template v-if="hiddenMenu.length > 0">
            <q-btn
              label="Others Menu"
              flat
              stretch
              no-wrap
              name="btnOtherMenu"
              :class="{
                'text-white': listOther,
                'bg-secondary': listOther,
              }"
              icon="img:statics/img/icon/ico-others-menu.svg"
            >
              <q-menu v-model="listOther">
                <q-list style="min-width: 100px">
                  <q-item
                    v-for="(m, idx) in hiddenMenu"
                    :key="idx"
                    v-close-popup
                    clickable
                    :name="`btn${m.label}`"
                    :to="`/home/${m.label}`"
                    :class="{
                      'bg-secondary': isActiveMenu(m.to, m.label),
                    }"
                  >
                    <q-item-section avatar>
                      <q-img :src="m.icon.replace('img:', '')" />
                    </q-item-section>
                    <q-item-section
                      :class="{ 'text-white': isActiveMenu(m.to, m.label) }"
                    >
                      {{ m.label }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </template>
        </q-toolbar>
        <q-toolbar class="col-12 col-md-4 text-primary">
          <q-space />
          <q-form @submit="onSubmitQuery">
            <q-input
              v-model="query"
              filled
              dense
              placeholder="Search"
              class="q-py-sm"
              autocomplete="off"
            >
              <template v-slot:append>
                <q-icon v-if="query === ''" name="search" />
                <q-icon
                  v-else
                  name="clear"
                  class="cursor-pointer"
                  @click="query = ''"
                />
              </template>
            </q-input>
          </q-form>
        </q-toolbar>
        <div class="col-12 col-md-2 text-primary">
          <q-btn
            :label="
              tellerName.length > 14 ? tellerName.substr(0, 14) : tellerName
            "
            class="q-pt-sm"
            flat
            no-wrap
            name="rightmenu"
          >
            <q-tooltip content-class="bg-primary" :offset="[10, 10]">
              {{ tellerName }}
            </q-tooltip>
            <q-menu>
              <div
                class="flex column items-center q-pa-sm"
                style="width: 200px"
              >
                <div class="row q-pt-sm" style="width: 100%">
                  <div class="col">Date</div>
                  <div class="col">: {{ currentDate }}</div>
                </div>
                <div class="row q-pt-sm" style="width: 100%">
                  <div class="col">User ID</div>
                  <div class="col">: {{ tellerId }}</div>
                </div>
                <div class="row q-pt-sm" style="width: 100%">
                  <div class="col">Level ID</div>
                  <div class="col">: {{ tellerLevelId }}</div>
                </div>
                <div class="row q-pt-sm" style="width: 100%">
                  <div class="col">Kode Uker</div>
                  <div class="col">: {{ tellerBranchCode }}</div>
                </div>
                <div class="row q-pt-sm" style="width: 100%">
                  <div class="col">App Version</div>
                  <div class="col">: {{ appVersion }}</div>
                </div>
                <template v-if="!isBranch">
                  <div class="row q-pt-sm" style="width: 100%">
                    <div class="col">Kanwil</div>
                    <div class="col">: {{ getRegionalOfficeCode }}</div>
                  </div>
                  <div class="row q-pt-sm" style="width: 100%">
                    <div class="col">Tipe Uker</div>
                    <div class="col">: {{ getBranchType }}</div>
                  </div>
                </template>
                <q-btn
                  v-close-popup
                  style="width: 100%; margin-top: 8px"
                  color="primary"
                  label="Logout"
                  name="logoutbutton"
                  @click="onLogout"
                />
              </div>
            </q-menu>
            <div class="q-gutter-sm">
              <q-icon name="account_circle" class="q-pl-sm" />
            </div>
          </q-btn>
          <span>
            <q-icon
              name="wifi"
              :class="
                signal == 0
                  ? 'rounded-green'
                  : signal > 0 && signal < 2
                  ? 'rounded-yellow'
                  : 'rounded-red'
              "
              style="font-size: 14px; margin-top: 8px; margin-left: -13px"
              color="white"
            />
          </span>
        </div>
        <q-separator class="bg-grey-4" />
        <div class="col-12 col-md-12 bg-grey-1 q-pl-xl">
          <breadcrumbs
            class="q-gutter-y-sm"
            style="margin-top: 12px; margin-bottom: 6px"
          />
        </div>
      </div>

      <!-- START: hamburger menu on small screen -->
      <q-toolbar class="bg-grey-1 text-primary lt-md">
        <q-btn flat color="primary" icon="menu">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item
                v-for="(m, idx) in menuGroups"
                :key="idx"
                v-close-popup
                clickable
                :name="`btn${m.label}`"
                :to="`/home/${m.label}`"
                :class="{
                  'text-white': isActiveMenu(m.to, m.label),
                  'bg-secondary': isActiveMenu(m.to, m.label),
                }"
              >
                <q-item-section avatar>
                  <q-img :src="m.icon.replace('img:', '')" />
                </q-item-section>
                <q-item-section
                  :class="{ 'text-white': isActiveMenu(m.to, m.label) }"
                >
                  {{ m.label }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-form style="width: 100%" class="q-mx-md" @submit="onSubmitQuery">
          <q-input
            v-model="query"
            filled
            dense
            placeholder="Search"
            class="q-py-sm"
            autocomplete="off"
          >
            <template v-slot:append>
              <q-icon
                v-if="query === ''"
                name="search"
                style="color: primary"
              />
              <q-icon
                v-else
                name="clear"
                class="cursor-pointer"
                @click="query = ''"
              />
            </template>
          </q-input>
        </q-form>
        <q-btn
          :label="tellerName"
          flat
          icon-right="account_circle"
          no-wrap
          name="rightmenu"
        >
          <q-menu>
            <div class="flex column items-center q-pa-sm" style="width: 200px">
              <div class="row q-pt-sm" style="width: 100%">
                <div class="col">Date</div>
                <div class="col">: {{ currentDate }}</div>
              </div>
              <div class="row q-pt-sm" style="width: 100%">
                <div class="col">User ID</div>
                <div class="col">: {{ tellerId }}</div>
              </div>
              <div class="row q-pt-sm" style="width: 100%">
                <div class="col">Level ID</div>
                <div class="col">: {{ tellerLevelId }}</div>
              </div>
              <div class="row q-pt-sm" style="width: 100%">
                <div class="col">Kode Uker</div>
                <div class="col">: {{ tellerBranchCode }}</div>
              </div>
              <div class="row q-pt-sm" style="width: 100%">
                <div class="col">App Version</div>
                <div class="col">: {{ appVersion }}</div>
              </div>
              <template v-if="!isBranch">
                <div class="row q-pt-sm" style="width: 100%">
                  <div class="col">Kanwil</div>
                  <div class="col">: {{ getRegionalOfficeCode }}</div>
                </div>
                <div class="row q-pt-sm" style="width: 100%">
                  <div class="col">Tipe Uker</div>
                  <div class="col">: {{ getBranchType }}</div>
                </div>
              </template>
              <q-btn
                v-close-popup
                style="width: 100%; margin-top: 8px"
                color="primary"
                label="Logout"
                name="logoutbutton"
                @click="onLogout"
              />
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
      <!-- END: hamburger menu on small screen -->
    </q-header>

    <q-page-container class="bg-grey-4">
      <router-view :key="$route.fullPath" />
      <PopupLogout
        v-show="popup"
        :popup="popup"
        @closeDialog="logoutFeedback"
      />
    </q-page-container>
    <Footer />
  </q-layout>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import PopupLogout from "src/components/feedback/GiveFeedback";
import handleInactiveUser from "src/mixins/handleInactiveUser";
import Config from "src/config";
import Breadcrumbs from "./components/Breadcrumbs";
import Footer from "./components/Footer";

export default {
  components: { Footer, PopupLogout, Breadcrumbs },
  mixins: [handleInactiveUser],
  data() {
    return {
      mobileData: false,
      bluetooth: true,
      tab: "",
      query: "",
      isConnected: true,
      popup: false,
      admin: this.$store.state.activeuser.lvlid,
      // Timeout
      USER_TIMEOUT: 600000,
      THROTEL_TIMEOUT: 60000,
      listOther: false,
      appVersion: Config.appVersion,
      thesignal: ''
    };
  },
  computed: {
    ...mapGetters("session", [
      "tellerLevelId",
      "tellerName",
      "tellerId",
      "tellerBranchCode",
      "menuGroups",
      "getRegionalOfficeCode",
      "getBranchType",
      "isBranch",
    ]),
    ...mapGetters("feedback", {
      feedbackSetupStatus: "getFeedbackSetupStatus",
      feedback: "feedback",
    }),
    ...mapGetters("signalIndicator", ["signal"]),
    currentDate() {
      return new Date().toJSON().slice(0, 10);
    },
    visibleMenu() {
      return this.menuGroups.slice(0, 3);
    },
    hiddenMenu() {
      return this.menuGroups.slice(3);
    },
  },
  mounted() {
    this.getSignalIndicator();
    // window.setInterval(() => {
    // TODO: enable lagi kalau sudah stable
    // if (this.admin !== "ADMI") {
    //   this.$store.dispatch("feedback/getFeedbackStatus");
    // } else {
    //   this.$store.dispatch("feedback/getSetupFeedback");
    // }
  },
  created() {
    // TODO: enable lagi kalau sudah stable
    // if (this.$store.state.activeuser.uuid === "") {
    //   this.$router.push("/login").catch(err => {});
    // }

    window.addEventListener("online", this.handleConnection);
    window.addEventListener("offline", this.handleConnection);
  },
  methods: {
    onSubmitQuery() {
      this.$store.dispatch("session/setMenuQuery", this.query);
    },
    isActiveMenu(to, menu) {
      return (
        this.$router.currentRoute.fullPath
          .toLowerCase()
          .startsWith(`/home/${menu.toLowerCase()}`) ||
        this.$router.currentRoute.fullPath
          .toLowerCase()
          .startsWith(`${to.toLowerCase()}`)
      );
    },
    isHome() {
      if (this.$router.currentRoute.path === "/home") {
        return true;
      }

      return false;
    },
    async getSignalIndicator() {
      this.$store.dispatch("signalIndicator/getSignal");
      this.thesignal = setInterval(async () => {
        await this.$store.dispatch("signalIndicator/getSignal");
      }, 5000)
    },
    async onLogout() {
      try {
        const path = this.$store.getters["session/isBranch"]
          ? "login"
          : "login-ub";
        clearInterval(this.thesignal)
        await this.$store.dispatch("session/logout", {
          path,
          useLoading: true,
        });
      } catch (err) {
        // console.error(err);
        this.popup = true;
      }
    },
    handleConnection() {
      if (navigator.onLine) {
        this.isConnected = false;
        this.isReachable(this.getServerUrl()).then((online) => {
          if (online) {
            console.debug("[connection]", "online");
          } else {
            console.debug("[connection]", "no connectivity");
          }
        });
      } else {
        this.isConnected = true;
        console.debug("[connection]", "offline");
      }
    },
    isReachable(url) {
      return fetch(url, { method: "HEAD", mode: "no-cors" })
        .then((resp) => resp && (resp.ok || resp.type === "opaque"))
        .catch((err) => {
          console.warn("[conn test failure]:", err);
        });
    },
    getServerUrl() {
      return window.location.origin;
    },
    logoutFeedback() {
      this.$store.commit("feedback/setFeedbackStatus", "Feedback Bypass");
      this.onLogout();
    },
    inactiveUserAction() {
      this.onLogout();
    },
  },
};
</script>
<style lang='scss'>
.led-box {
  height: 30px;
  width: 100%;
  margin: 50px 0;
}
.led-box p {
  font-size: 12px;
  text-align: center;
  margin: 1em;
}
.led-light {
  margin: 0 auto;
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
.led-green {
  background-color: #4bd28f;
}
.led-red {
  background-color: #ff4d4d;
}
.rounded-green {
  background-color: #1ec759;
  border-radius: 50%;
  display: inline-block;
  padding: 5px;
}
.rounded-red {
  background-color: #ff4d4d;
  border-radius: 50%;
  display: inline-block;
  padding: 5px;
}
.rounded-yellow {
  background-color: #f6ff4d;
  border-radius: 50%;
  display: inline-block;
  padding: 5px;
}
.isOn {
  font-size: 14px;
  color: #4bd28f;
  margin: auto 5px;
}
.isOff {
  font-size: 14px;
  color: #ff4d4d;
  margin: auto 5px;
}
.q-layout__shadow:after {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1), 0 0 0 0 rgba(0, 0, 0, 0.1);
}
</style>
