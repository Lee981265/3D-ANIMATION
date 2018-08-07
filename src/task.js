let task = (function () {
    let run = function () {
        let arr = [
            {
                lang: 'ar',
                userNums: 3,
                sum: '9000',
                dollerSum: 8.91 },
            {
                lang: 'en',
                userNums: 2,
                sum: '6000',
                dollerSum: 5.9399999999999995 },
            {
                lang: 'zh',
                userNums: 5,
                sum: '6000',
                dollerSum: 5.9399999999999995 },
            {
                lang: 'zh',
                userNums: 1,
                sum: '10500',
                dollerSum: 9.99 } ];

        /*能把lang：对应相同的值合并，，其他字段的值相加*/

        for(let i=1;i<arr.length;i++){
            for(let key in arr[i]){
                if(key!=='lang'){
                    arr[i][key] =parseFloat(arr[i][key]) + parseFloat(arr[i-1][key]);
                }else{
                    arr[i][key]+=','+arr[i-1][key];
                }
            }
        }
        console.log(arr[arr.length-1]);



    };

    return {
        run:run
    }
})();

export default task;