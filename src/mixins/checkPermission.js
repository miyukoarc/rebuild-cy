import {mapState} from 'vuex'

export default {
    mounted () {
        
    },
    methods: {
        checkPermission(){
            const firtLv = this.$route.path.split('/')[1]
            const secondLv = this.$route.path.slice(1).replace('/','_')
            return this.$store.state.permisionMap[firtLv][secondLv]
        }
    }
}