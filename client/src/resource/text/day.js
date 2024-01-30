const D = `
 _____  
|  __ \\
| |  | |
| |  | |
| |__| |
|_____/ 
`;
const Plus = `   
   _   
 _| |_ 
|_   _|
  |_|`;


// const D =             
// `    ,---,    
//   .'  .' '\\  
// ,---.'     \\ 
// |   |  .'\\  |
// :   : |  '  | 
// |   ' '  ;  : 
// '   | ;  .  | 
// |   | :  |  : 
// '   : | /  ;  
// |   | ''  /   
// ;   : , '    
// '---''
// `;

// const Plus = `
//     ,----,
//   .'---.': 
//   |   :  |--,
//   :   |  :.'|
//   ,__ :     :
// ,---.'     ,|
// |   |    ,'  
// :   :    | 
// :   |.;  : 
// '---' |  | 
//   :   |.'  
//   '---'
// `;

// const zero = `              
//     ,----..     
//    /   /   \\    
//   /   .     :   
//  .   /   ;.  \\  
// .   ;   /  ' ;  
// ;   |  ; \\ ; |  
// |   :  | ; | '  
// .   |  ' ' ' :  
// '   ;  \\; /  |  
//  \\   \\  ',  /   
//   ;   :    /    
//    \\   \\ .'     
//     '---'                                                                                      
// `;

// const one = `
//     ,---, 
//   ,'--.' |
//  /    /  :
// :    |.' '
// '----' : |
//    '   ' ;
//    |   | |
//    '   : ;
//    |   | '
//    '   : ;
//    |   | '
//    '   : |
//    ;   |.'
//    '---'  
// `;

// const two = `
//       ,----,  
//     .'   .' \\
//   ,----,'    |
//   |    :  .  ;
//   ;    |.'  / 
//   '----'/  ;  
//     /  ;  /   
//    ;  /  /-,  
//   /  /  /.'|  
// ./__;      :  
// |   :    .'   
// ;   | .'      
// '---'         
// `;

// const three = `
//    .--,-''-.    
//   /   /     '.  
//  / ../        ; 
//  \\ ''\\  .'-    '
//   \\___\\/   \\   :
//        \\   :   |
//        /  /   / 
//        \\  \\   \\
//    ___ /   :   |
//  /   /\\   /   :
// / ,,/  ',-    .
// \\ ''\\        ;  
//  \\   \\     .'   
//   '--'-,,-'     
// `;

// const four = 
// `        ,--,  
//       ,--.'|  
//    ,--,  | :  
// ,---.'|  : '  
// ;   : |  | ;  
// |   | : _' |  
// :   : |.'  |  
// |   ' '  ; :  
// \\   \\  .'. |
//  '---':  | '  
//       '  ; |  
//       |  : ;  
//       '  ,/   
//       '--'      
// `;

// const five = `
//        ,----,. 
//      ,'   ,' | 
//    ,'   .'   | 
//  ,----.'    .' 
//  |    |   .'   
//  :    :  |--,  
//  :    |  ;.' \\
//  |    |      | 
//  '----'.'\\   ;
//    __  \\  .  |
//  /   /\\/  /  :
// / ,,/  ',-   . 
// \\ ''\\       ;
//  \\   \\    .' 
//   '--'-,-'     
// `;

// const six =`
//     ,---.     
//    /     \\   
//   /    / '    
//  .    ' /     
// '    / ;      
// |   :  \\     
// ;   |   ''.   
// '   ;      \\ 
// '   |  .\\  | 
// |   :  ';  :  
//  \\   \\    / 
//   '---'--'    
// `;

// const seven = `
//          ,----,
//        .'   .'|
//     .'   .'   ;
//   ,---, '    .'
//   |   :     ./ 
//   ;   | .'  /  
//   '---' /  ;   
//     /  ;  /    
//    ;  /  /     
//   /  /  /      
// ./__;  /       
// |   : /        
// ;   |/         
// '---'       
// `;

// const eight = `
//       ,---.-,  
//     '   ,'  '. 
//   /   /      \\
//  .   ;  ,/.  : 
//  '   |  | :  ; 
//  '   |  ./   : 
//  |   :       , 
// \\   \\     /
//   ;   ,   '\\ 
//  /   /      \\ 
//  .   ;  ,/.  : 
//  '   |  | :  ; 
//  '   |  ./   : 
//  |   :      /  
//  \\   \\   .'  
//    '---'-'     
// `;

// const nine = `
//     ,---.-,  
//   '   ,'  '. 
// /   /      \\
// .   ;  ,/.  :
// '   |  | :  ;
// '   |  ./   :
// |   :       ,
// \\   \\      |
//   '---'---  ;
//      |   |  |
//      '   :  ;
//      |   |  '
//      ;   |.'
//      '---'    
// `;

const zero = `
  ___
 / _ \\
| | | |
| | | |
| |_| |
\\___/                                                                            
`;

const one = `
 __  
/_ | 
 | | 
 | | 
 | | 
 |_| 
`;

const two = `
 ___ 
|__ \\
   ) |
  / / 
 / /_ 
|____|
`;

const three = `
 ____  
|___ \\
 __) | 
|__ <  
 ___)| 
|____/ 
`;

const four = `
 _  _   
| || |  
| || |_ 
|__   _|
   | |  
   |_|  
`;

const five = `
 _____ 
| ____|
| |__  
|___ \\
 ___) |
|____/ 
`;

const six = `
  __   
 / /   
/ /_   
| '_ \\
| (_) |
\\___/ 
`;

const seven = `
 ______ 
|____  |
    / / 
   / /  
  / /   
 /_/    
`;

const eight = `
  ___   
 / _ \\ 
| (_) | 
 > _ <  
| (_) | 
\\___/  
`;

const nine = `
  ___ 
/  _ \\ 
| (_) |
\\__, |
   / / 
  /_/  
`;

const NUMBER = [zero, one, two, three, four, five, six, seven, eight, nine];

export {D, Plus, NUMBER};
                   