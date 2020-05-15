<template>
    <div>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title">
                    Memu
                </v-list-item-title>
                <v-list-item-title>
                    0.0.1
                </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
                <v-btn @click="changeEditable" icon>
                    <v-icon v-text="$store.state.editable ? 'mdi-eye' : 'mdi-pencil'"></v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>

        <v-list nav>
            <v-list-group
            v-for="(item, i) in items"
            :key="i"
            v-model="item.active"
            :prepend-icon="item.icon"
            :no-action="!$store.state.editable"
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{item.title}}
                            <span v-if="$store.state.editable">
                                <v-btn icon fab dark small color="grey darken-2" @click="openDialogItem(i)">
                                    <v-icon dark small>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn icon fab dark small color="grey darken-2" @click="moveItem(items, i, -1)" v-if="i > 0">
                                    <v-icon dark small>mdi-chevron-double-up</v-icon>
                                </v-btn>
                                <v-btn icon fab dark small color="grey darken-2" @click="moveItem(items, i, 1)" v-if="i < items.length - 1">
                                    <v-icon dark small>mdi-chevron-double-down</v-icon>
                                </v-btn>
                            </span>
                        </v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item
                    v-for="(subItem, j) in item.subItems"
                    :key="j"
                    :to="$store.state.editable ? null : subItem.to"
                >
                    <v-list-item-content>
                        <v-list-item-title :class="$store.state.editable ? 'pl-5' : ''">
                            {{subItem.title}}
                            <span v-if="$store.state.editable">
                                <v-btn icon fab dark small color="grey darken-2" @click="openDialogSubItem(i, j)">
                                    <v-icon dark small>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn icon fab dark small color="grey darken-2" @click="moveSubItem(items, i, j, -1)" v-if="j > 0">
                                    <v-icon dark small>mdi-chevron-double-up</v-icon>
                                </v-btn>
                                <v-btn icon fab dark small color="grey darken-2" @click="moveSubItem(items, i, j, 1)" v-if="j < item.subItems.length - 1">
                                    <v-icon dark small>mdi-chevron-double-down</v-icon>
                                </v-btn>
                            </span>
                        </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action v-if="$store.state.editable">
                        <v-btn icon :to="subItem.to" exact>
                            <v-icon>mid-arrow-right-bold-circle-outline</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
                <v-list-item @click="openDialogSubItem(i, -1)" v-if="$store.state.editable">
                    <v-list-item-icon :class="$store.state.editable ? 'pl-5' : ''">
                        <v-icon>mdi-plus</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>추가하기</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
            <v-list-item @click="openDialogItem(-1)" v-if="$store.state.editable">
                <v-list-item-icon>
                    <v-icon>mdi-plus</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>추가하기</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-dialog v-model="dialogItem" max-width="400">
            <v-card>
                <v-card-title>
                    수정하기
                    <v-spacer />
                    <v-btn icon @click="saveItem">
                        <v-icon>mdi-content-save</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-text-field
                      v-model="formItem.title"
                      placeholder="title"
                    ></v-text-field>
                    <v-text-field
                      v-model="formItem.icon"
                      placeholder="icon"
                    ></v-text-field>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogSubItem" max-width="400">
            <v-card>
                <v-card-title>
                    수정하기
                    <v-spacer />
                    <v-btn icon @click="saveSubItem">
                        <v-icon>mdi-content-save</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-text-field
                      v-model="formSubItem.title"
                      placeholder="title"
                    ></v-text-field>
                    <v-text-field
                      v-model="formSubItem.to"
                      placeholder="to"
                    ></v-text-field>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

export default {
    props: ['items'],
    data () {
        return {
            loading: false,
            dialogItem: false,
            dialogSubItem: false,
            selectedItemIndex: 0,
            selectedSubItemIndex: 0,
            formItem: {
                icon: 'mdi-crosshairs-question',
                title: ''
            },
            formSubItem: {
                icon: '',
                title: ''
            }
        }
    },
    created () {
        console.log('로컬에 저장된 수정모드 상태 :', localStorage.getItem('editable') )
        if ( localStorage.getItem('editable') ) {
            let val = localStorage.getItem('editable') === 'false' ? false : true
            this.$store.dispatch('initSetEdit', val )
        }
    },
    methods: {
        async save () {
            try {
                this.loading = true
                await this.$firebase.database().ref().child('site').set({ menu : this.items })
            } finally {
                this.dialogItem = false
                this.dialogSubItem = false
                this.loading = false
            }
        },
        openDialogItem (index) {
            this.selectedItemIndex = index
            if (index < 0) {
                this.formItem.icon = 'mdi-crosshairs-question'
                this.formItem.title = ''
            } else {
                this.formItem.icon = this.items[index].icon
                this.formItem.title = this.items[index].title
            }
            this.dialogItem = true
        },
        saveItem () {
            if (this.selectedItemIndex < 0) {
                this.items.push(this.formItem)
            } else {
                this.items[this.selectedItemIndex].title = this.formItem.title
                this.items[this.selectedItemIndex].icon = this.formItem.icon;
            }
            this.save()
        },
        openDialogSubItem (index, subIndex) {
            this.selectedItemIndex = index
            this.selectedSubItemIndex = subIndex
            if (subIndex < 0) {
                this.formSubItem.title = ''
                this.formSubItem.to = ''
            } else {
                this.formSubItem.title = this.items[index].subItems[subIndex].title
                this.formSubItem.to = this.items[index].subItems[subIndex].to
            }
            this.dialogSubItem = true
        },
        async saveSubItem () {
            if (this.selectedSubItemIndex < 0) {
                if(!this.items[this.selectedItemIndex].subItems) this.items[this.selectedItemIndex].subItems = []
                this.items[this.selectedItemIndex].subItems.push({ title: this.formSubItem.title, to: this.formSubItem.to })
            } else {
                this.items[this.selectedItemIndex].subItems[this.selectedSubItemIndex].title = this.formSubItem.title
                this.items[this.selectedItemIndex].subItems[this.selectedSubItemIndex].to = this.formSubItem.to
            }
            this.save()
        },
        moveItem (items, i, arrow) {
            const item = items.splice(i, 1)[0]
            items.splice(i + arrow, 0, item)
            this.save()
        },
        moveSubItem (items, i, j, arrow) {
            const subItems = items[i].subItems
            const item = subItems.splice(j, 1)[0]
            subItems.splice(j + arrow, 0, item)
            this.save()
        },
        changeEditable () {
            localStorage.setItem('editable', !this.$store.state.editable)
            console.log('변경한 수정모드 상태: ', localStorage.getItem('editable'))
            this.$store.dispatch('initSetEdit', !this.$store.state.editable)
            
        }
    }
}
</script>
    