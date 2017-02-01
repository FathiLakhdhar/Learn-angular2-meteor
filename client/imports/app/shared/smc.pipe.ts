import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
    name: 'smc'
})

export class SMCPipe implements PipeTransform {
    transform(str: String, m: String) {
        
        if(m.length>0){
            var re = new RegExp("("+m+")", 'gi');
            var newstr = str.replace(re, "<b class='motfind'>$1</b>");
            return newstr;
        }

        return str;
        


    }
}