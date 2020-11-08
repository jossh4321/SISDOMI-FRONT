<template>
  <v-navigation-drawer
    id="appDrawer"
    :mini-variant.sync="mini"
    fixed
    :dark="$vuetify.dark"
    app
    v-model="drawer"
    width="280"
  >
    <v-toolbar color="primary darken-1" dark>
      <img src="../../assets/static/m.png" height="36" alt="CARDOMI" />
      <v-toolbar-title class="ml-0 pl-3">
        <span class="hidden-sm-and-down">SISCAR</span>
      </v-toolbar-title>
    </v-toolbar>
    <perfect-scrollbar class="drawer-menu--scroll" :options="scrollSettings">
      <v-list dense expand>
        <template v-for="(item, i) in menus">
          <!-- grupos de los items de los menus -->
          <v-list-group
            v-if="item.items"
            :key="item.name"
            :group="item.group"
            :prepend-icon="item.icon"
            no-action="no-action"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <template v-for="(subItem, i) in item.items">
              <!-- Subgrupo -->
              <v-list-group
                v-if="subItem.items"
                :key="subItem.name"
                :group="subItem.group"
                sub-group="group"
              >
                <v-list-item slot="activator" ripple="ripple">
                  <v-list-item-content>
                    <v-list-item-title>{{ subItem.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-for="(grand, i) in subItem.children"
                  :key="i"
                  :to="grand.href? grand.href: null"
                  ripple="ripple"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ grand.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
              <!-- Item Hijo -->
              <v-list-item
                v-else
                :key="i"
                :to="subItem.href? subItem.href : null"
                :disabled="subItem.disabled"
                :target="subItem.target"
                ripple="ripple"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    <span>{{ subItem.title }}</span>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action v-if="subItem.action">
                  <v-icon :class="[subItem.actionClass || 'success--text']">{{ subItem.action }}</v-icon>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list-group>
          <v-subheader v-else-if="item.header" :key="i">{{ item.header }}</v-subheader>
          <v-divider v-else-if="item.divider" :key="i"></v-divider>
          <!-- Enlace Inicial en la cual no tienen grupos -->
          <v-list-item
            v-else
            :to="item.href ? item.href: null"
            ripple="ripple"
            :disabled="item.disabled"
            :target="item.target"
            rel="noopener"
            :key="item.name"
          >
            <v-list-item-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action v-if="item.subAction">
              <v-icon class="success--text">{{ item.subAction }}</v-icon>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "app-drawer",
  data: () => {
    return {
      mini: false,
      menus: [
        {
          header: "Apps",
        },
        {
          title: "Dashboard",
          group: "apps",
          icon: "dashboard",
          name: "Dashboard",
          href: "/dashboard",
        },
        {
          title: "Widgets",
          group: "widgets",
          component: "widgets",
          icon: "tune",
          items: [{ name: "social", title: "Social", href: "/widgets/social" }],
        },
        { header: "UI Elements" },
        {
          title: "General",
          group: "components",
          component: "components",
          icon: "tune",
          items: [{ name: "alerts", title: "Alerts", href: "/general/alerts" }],
        },
        { header: "Admin" },
        {
          title: "Gestion de Usuarios",
          group: "admin",
          icon: "dashboard",
          name: "GestionUsuarios",
          href: "/dashboard/usuarios"
        },
        {
          title: "Gestion de Residentes",
          group: "admin",
          icon: "dashboard",
          name: "GestionarResidentes",
          href: "/dashboard/residentes"
        },
        {
          title: "Gestionar Plan de Intervención",
          group: "admin",
          icon: "dashboard",
          name: "GestionPlanIntervencion",
          href: "/dashboard/planIntervencion"
        },
        {
          title: "Gestionar Talleres",
          group: "admin",
          icon: "dashboard",
          name: "GestionTalleres",
          href: "/dashboard/talleres"
        },
        {
          title: "Gestionar Informe",
          group: "admin",
          icon: "dashboard",
          name: "GestionInforme",
          href: "/dashboard/informes"
        },{
          title: "Gestion Ficha Ingreso",
          group: "admin",
          icon: "dashboard",
          name: "GestionarFichaIngreso",
          href: "/dashboard/fichaIngreso"
        },
      ],
      scrollSettings: {
        maxScrollbarLength: 160,
      },
    };
  },
  props: {
    expanded: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        return this.$store.commit("drawer", val);
      },
    },
    computedGroupActive() {
      return true;
    },
    sideToolbarColor() {
      return this.$vuetify.options.extra.sideNav;
    },
  },
};
</script>

<style lang="scss">

#appDrawer {
  overflow: hidden;
  .drawer-menu--scroll {
    height:  calc(100vh - 48px);
    overflow: auto;
  }
}
#appDrawer .v-navigation-drawer__content {
      overflow-y: hidden;
  }
</style>
