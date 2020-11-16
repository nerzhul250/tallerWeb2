<template>
  <v-data-table :headers="headers" :items="usuarios" :search="search">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Los usuarios del sistema</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="mr-5"
        ></v-text-field>
        <v-dialog v-model="dialog" max-width="1000px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Nuevo usuario
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-subtitle>
              La contraseña por default es: 123456
            </v-card-subtitle>
            <v-card-text>
              <v-form v-model="valid">
                <v-container>
                  <v-row>
                    <v-col cols="4">
                      <v-text-field
                        v-model="editedItem.firstname"
                        label="Firstname"
                        :rules="genericRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="editedItem.lastname"
                        label="Lastname"
                        :rules="genericRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="editedItem.username"
                        label="Username"
                        :rules="genericRules"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4">
                      <v-checkbox
                        v-model="editedItem.active"
                        label="Active"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="editedItem.photo"
                        label="Photo"
                        :rules="genericRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="editedItem.identification"
                        label="Identification"
                        :rules="genericRules"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Estas seguro de eliminar este usuario?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancelar</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
var md5 = require("md5");
import api from "../helpers/api";

export default {
  data() {
    return {
      valid: false,
      usuarios: [],
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: "Firstname", value: "firstname" },
        { text: "Lastname", value: "lastname" },
        { text: "Username", value: "username" },
        { text: "Identification", value: "identification" },
        { text: "Photo", value: "photo" },
        { text: "Active", value: "active" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      editedItem: {
        firstname: "",
        lastname: "",
        username: "",
        identification: "",
        photo: "",
        active: false,
      },
      defaultItem: {
        firstname: "",
        lastname: "",
        username: "",
        identification: "",
        photo: "",
        active: false,
      },
      editedIndex: -1,
      search: "",
      genericRules: [(g) => !!g || "Este campo es obligatorio"],
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo usuario" : "Editar usuario";
    },
  },
  methods: {
    refresh() {
      api.get("/users").then((res) => {
        this.usuarios = res.data;
        console.log(res.data);
      });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.valid) {
        if (this.editedIndex != -1) {
          this.editedIndex = 0;
          let usuarioEdited = this.editedItem;
          console.log(usuarioEdited);
          api
            .put("/users/" + usuarioEdited._id, usuarioEdited)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          let nuevoUsuario = this.editedItem;
          nuevoUsuario.password = "123456";
          nuevoUsuario.password = md5(nuevoUsuario.password);
          api
            .post("/users", nuevoUsuario)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        this.close();
      } else {
        alert("Faltan campos por llenar");
      }
      this.refresh()
    },
    editItem(item) {
      this.editedIndex = item._id;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = item._id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      this.refresh();
    },

    deleteItemConfirm() {
      api
        .delete("/users/" + this.editedIndex)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
      this.closeDelete();
      this.refresh();
    },
    initialize() {
      console.log("doing nothing, jejeje");
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  mounted() {
    this.refresh()
  },
};
</script>

<style scoped>
</style>