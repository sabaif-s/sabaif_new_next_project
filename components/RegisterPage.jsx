import React from 'react';

const  RegisterPage = () => {
    return (
        <div className='text-green-300 font-bold flex flex-col px-64 gap-y-4' >
             <input type="text"  placeholder='please add username' autoComplete='off'  id="" />
             <input type="text" placeholder='please add email' autoComplete='off'  id="" />
             <input type="text" autoComplete='off'  id="" />
             <input type="text"  autoComplete='off' id="" />
             <button>
                submit
             </button>
        </div>
    );
};

export default  RegisterPage;