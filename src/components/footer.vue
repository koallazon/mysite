<template>
    <v-footer
        color="indigo darken-4"
        app
        dark
        absolute
        :footer="footer"
    >
        <span>{{footer}}</span>
        <v-btn icon @click="openDialog">
            <v-icon>mdi-pencil-outline mdi-18px</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" max-width="400">
            <v-card>
            <v-card-title>
                꼬릿말 수정
                <v-spacer/>
                <v-btn icon @click="save"><v-icon>mdi-content-save</v-icon></v-btn>
                <v-btn icon @click="dialog=false"><v-icon>mdi-close</v-icon></v-btn>
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="text" oulined @keypress.enter="save" hide-details/>
            </v-card-text>
            </v-card>
        </v-dialog>
    </v-footer>
</template>

<script>
export default {
    props: ['footer'],
    data () {
        return {
            dialog: false,
            text : this.footer
        }
    },
    methods: {
        openDialog () {
            this.dialog = true
        },
        async save () {
            try {
                await this.$firebase.database().ref().child('site').update({ footer : this.text })
                this.dialog = false
            } finally {
                this.dialog = false
            }
        }
    }
}
</script>
