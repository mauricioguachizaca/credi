import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
// import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#5D6FFF', // #E53935
                secondary: '#2BBDED', // #FFCDD2
                accent: '#2BBDED' // #3F51B5
            },
        },
    },
});
