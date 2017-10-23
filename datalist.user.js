// ==UserScript==
// @name            WOD Search Datalist 
// @namespace       ttang.tw
// @updateURL       https://bitbucket.org/Xyzith/wod_search_datalist/raw/sync/datalist.user.js
// @grant           none
// @author          Taylor Tang
// @version         1.2
// @description     Replace search form select with datalist
// @include         *://*.world-of-dungeons.org/wod/spiel/hero/items.php*
// @include         *://*.world-of-dungeons.org/wod/spiel/trade/trade.php*
// ==/UserScript==

(function(){
    var chs = '险游诗圣学杂艺师炼术猎萨满斗蛮骑图伦灵玛边头镜颈体带风双单脚勋装备队联质权动数复荣誉丝线绸乐奖书惧伞传遗阳阴宝护冲锋枪决击剑创纸来医给疗轴御运厨阵载剧讽谱异华娱闪电弹会导镇唤证战涂掷帜时机关挡链条灾祸锁药砾剂注准种烬视铠烟浓记强韧发纯净远启觉声矿仪祷红雾辅话竞场赛纪尘兑换梦纹缝纫网环恶补丰诱饵财转轮轻钝镶饰织属级长杆领饮鹰励亚弑冻悬势赎锚极飞现涌显独兽顶终诞虚约锤诸龙刚铸颠坚愤号虫语讲识抚诚颂础赋争节焕凤专观测选资丑后许拥标壮经验压无间结踪赐须义云跃迁炽试热疯着悦负缓调辉脱钢铁锐腾戏贝宽实隐慑啸气预驯态临吓阔夸树肤诈苏维纱惩驱审诅狱连杀尔倾泻斩乱确贯顺进阶侦点袭应滚弥绝处变岩编设触对灭凌锥涡摇广轰鸣抛断胫坠横扫凋浑渗陨垒烧杨晕颅绊绞缠缴亲脉离优飓饭顿锻择阅读洁军规顽与状惊丛统于潜胆筹侧范围帅髅礼奥鲁类笼将鸟严厉乌国产团从开侠盗涤凛凯缘赞历吴综迹万岁执灯馈赠卫马纳扎败达晓捣莱里爱旷谣难题说渔则狮库烛汉为贤妆罚园罗鸦诲胜莲门阐释见习贾跹尸钻铭银蓝怜悯挥继';
    var cht = '險遊詩聖學雜藝師煉術獵薩滿鬥蠻騎圖倫靈瑪邊頭鏡頸體帶風雙單腳勳裝備隊聯質權動數覆榮譽絲線綢樂獎書懼傘傳遺陽陰寶護沖鋒槍決擊劍創紙來醫給療軸禦運廚陣載劇諷譜異華娛閃電彈會導鎮喚證戰塗擲幟時機關擋鏈條災禍鎖藥礫劑註準種燼視鎧煙濃記強韌發純凈遠啟覺聲礦儀禱紅霧輔話競場賽紀塵兌換夢紋縫紉網環惡補豐誘餌財轉輪輕鈍鑲飾織屬級長桿領飲鷹勵亞弒凍懸勢贖錨極飛現湧顯獨獸頂終誕虛約錘諸龍剛鑄顛堅憤號蟲語講識撫誠頌礎賦爭節煥鳳專觀測選資醜後許擁標壯經驗壓無間結蹤賜須義雲躍遷熾試熱瘋著悅負緩調輝脫鋼鐵銳騰戲貝寬實隱懾嘯氣預馴態臨嚇闊誇樹膚詐蘇維紗懲驅審詛獄連殺爾傾瀉斬亂確貫順進階偵點襲應滾彌絕處變巖編設觸對滅淩錐渦搖廣轟鳴拋斷脛墜橫掃雕渾滲隕壘燒楊暈顱絆絞纏繳親脈離優颶飯頓鍛擇閱讀潔軍規頑與狀驚叢統於潛膽籌側範圍帥髏禮奧魯類籠將鳥嚴厲烏國產團從開俠盜滌凜凱緣讚歷吳綜跡萬歲執燈饋贈衛馬納紮敗達曉搗萊裏愛曠謠難題說漁則獅庫燭漢為賢妝罰園羅鴉誨勝蓮門闡釋見習賈躚屍鉆銘銀藍憐憫揮繼';

    function updateOverlay(input) {
        var overlay = input.nextSibling;
        var list = overlay.nextSibling;
        var selected = list.querySelector('[value="' + input.value + '"]');
        console.log(list);
        if(selected) {
            overlay.textContent = selected.textContent;
        } else {
            overlay.textContent = '';
        }
    }

    function ownClassRace(e) {
        e.preventDefault();
        var classSelect = document.querySelector('input[name*="hero_class"]');
        var raceSelect = document.querySelector('input[name*="hero_race"]');
        var myrace = document.getElementsByName('rasse_id')[0].value;
        var myclass = document.getElementsByName('klasse_id')[0].value;
        classSelect.value = myclass;
        raceSelect.value = myrace;
        updateOverlay(classSelect);
        updateOverlay(raceSelect);
    }

    function override(func) {
        var str = func.toString();
        var script = document.createElement('script');
        script.textContent = func;
        document.head.appendChild(script);
    }
    function renderDataList(select) {
        var container = document.createElement('span');
        var input = document.createElement('input');
        var overlay = document.createElement('div');
        var list = document.createElement('datalist');
        var name = select.name;
        var list_id = name + '_list';
        var value = select.value;
        var td = select.parentNode;
        td.style.whiteSpace = 'nowrap';
        container.style.position = 'relative';

        input.setAttribute('list', list_id);
        input.name = name;
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.right = '18px';
        overlay.style.height = '100%';
        overlay.style.pointerEvents = 'none';
        overlay.style.boxSizing = 'border-box';
        overlay.style.textAlign = 'right';
        overlay.style.paddingLeft = '8px';
        overlay.style.backgroundColor = window.getComputedStyle(select, null).backgroundColor;
        regInputHandler(input, overlay, list);

        input.style.width = select.offsetWidth + 18 + 'px';
        input.addEventListener('focus', function(e) {
            e.target.value = '';
            updateOverlay(e.target);
        });
        input.addEventListener('change', function(e) {
            console.log('change');
            var value = e.target.value;
            var list = e.target.nextSibling.nextSibling;
            for(let el of list.options) {
                if(el.text === e.target.value) {
                    e.target.value = el.value;
                    updateOverlay(e.target);
                    break;
                }
            }
        });
        input.addEventListener('input', function(e) {
            updateOverlay(e.target);
        });
        list.id = list_id;

        list.draggable = 'true';
        while(select.children.length) {
            list.appendChild(select.children[0]);
        }
        container.appendChild(input);
        container.appendChild(overlay);
        container.appendChild(list);
        if(value != 0 && value != 'NULL') {
            input.value = value;
        }
        updateOverlay(input);

        select.parentNode.replaceChild(container, select);
    }
    function regInputHandler(input) {
        var index;
        var pre_value;
        var compose = false;
        var compose_value = '';

        function translate(str) {
            var translate = chineseTranslate(str); if(input.value != translate) {
                input.value = translate;
            }
        }
        input.addEventListener('keydown', function(e) {
            pre_value = e.target.value;
            index = e.target.locale;
        });
        input.addEventListener('compositionstart', function(e) {
            compose = true;
        });
        input.addEventListener('compositionupdate', function(e) {
            compose_value = e.data;
        });
        input.addEventListener('input', function(e) {
            pre_value = e.target.value;
            if(!compose) {
                translate(input.value);
            } else {
//              translate(compose_value);
            }
        });
        input.addEventListener('compositionend', function(e) {
            compose = false;
            translate(input.value);
        });
    }
    function chineseTranslate(str) {
        str = (str || '').split('');
        for(let i = 0; i < str.length; i++) {
            let match = cht.match(str[i]);
            if(match) {
                str[i] = chs[match.index];
            }
        }
        return str.join('');
    }
    function init() {
        var search = document.querySelector('.search_container');
        var selects = search.getElementsByTagName('select');
        if(search) {
            document.querySelector('.search_details a').onclick = ownClassRace;
            while(selects.length) {
                renderDataList(selects[0]);
            }
        }
    }
    init();



    /*
    ** chinese translate stuff **

    function getOptionsText(selects) {
        var str = '';
        var set = new Set();
        for(let sel of selects) {
            for(let ops  of sel) {
                ops.textContent.split('').forEach(function(t){
                    console.log(t);
                    set.add(t);
                });
            }
        }
        set.forEach(function(t){
            str += t;
        });
        console.log(str);
    }
    function textMapSimplify() {
        var str = '';
        for(let i = 0; i < chs.length; i++) {
            if(chs[i] != cht[i]) {
                str += chs[i];
            }
        }
        console.log(str);
    }
    */
})();
