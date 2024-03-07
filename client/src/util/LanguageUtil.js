import kor from './kor.json';
import eng from './eng.json';

export default {
    get kor() {
        return "KOR"
    },
    get eng() {
        return "ENG"
    },
    get eng_obj() {
        return {
            val: this.eng,
            label: this.kor
        }
    },
    get kor_obj() {
        return {
            val: this.kor,
            label: this.eng
        }
    },
    getLangObj(val) {
        if(val == this.kor || val?.val == this.kor) return this.kor_obj;
        else if (val == this.eng || val?.val == this.eng) return this.eng_obj;
    },
    langData(lang) {
        if (lang == this.kor || lang?.val == this.kor) {
            return kor
        } else return eng;
    },
    // getCurLeng(callback, lang) {
    //     if(!lang) {
    //         axios.get('/api/getLanguage').then((res) => {
    //             console.log('lang 불러 옴', res.data);
    //             lang = res.data;
    //             callback(lang);
    //         });
    //     } else {
    //         console.log('현재 lang : ', lang);
    //         callback(lang);
    //     }
    // },
    // async getLanguage() {
    //     axios.get('/api/getLanguage').then((res) => {
    //         console.log('lang 불러 옴', res.data);
    //         return res.data;
    //     })
    // },
    getMessage(msg, _lang) {
        const msgArr = msg.split('.');
        // const lang = this.getCurLeng();
        // const lang = this.kor;
        let result;
        const cur = this.langData(_lang);
        let _cur = cur;
        msgArr.forEach((key) => {
            _cur = _cur[key];
        })
        result = _cur;
        // this.getCurLeng(cb);
        return result;
        
    },
    // changeLang(_lang, callback) {
    //     axios.post('/api/setLanguage', {lang: _lang}).then((res) => {
    //         // if(typeof res.data == 'object') lang = res.data.val;
    //         callback(this.getLangObj(res.data));
    //     });
    // }
}