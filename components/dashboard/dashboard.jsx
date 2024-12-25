import React from 'react';

const  DashBoard = () => {
    return (
        <div className='w-full h-screen overflow-hidden bg-gray-300 flex flex-row rounded-lg' >
                         <div className='w-1/4 h-full flex flex-col bg-gradient-to-t from-sky-950 via-sky-950 to-sky-800 py-20 px-10' >
                                    <div className='w-full  flex flex-col items-center gap-y-2'>
                                        <div className='w-full flex justify-center items-center' >
                                            <img src="dashboardImage/profile image.jpg" className='w-40 h-40 rounded-full' alt="" />
                                        </div>
                                        <div className='w-full h-10 flex flex-row justify-center items-center' >
                                            <span className='text-2xl text-white' >
                                                SEBAIF MUHAMMED
                                            </span>
                                        </div>
                                        <div className='w-1/2  h-2 rounded bg-white relative z-50' >
                                           
                                        </div>
                                    </div>
                                    <div className='w-full h-full flex flex-col gap-y-6 mt-4 items-center justify-center' >
                                        <div className='w-full flex mb-4 flex-row gap-x-4 justify-center items-center' >
                                            <div className='w-10 h-8' >
                                               <img className='w-10 h-8' src="/dashboardImage/dashboard.png" alt="" srcset="" />
                                            </div>
                                            <div className='flex w-full flex-row justify-center' >
                                                <span className='text-2xl text-white font-bold' >
                                                DASHBOARD
                                                </span>
                                                 
                                            </div>
                                        </div>
                                        <div className='w-full flex mb-4 flex-row gap-x-4 justify-center items-center' >
                                            <div className='w-10 h-8' >
                                               <img className='w-10 h-8' src="/dashboardImage/favorite.png" alt="" srcset="" />
                                            </div>
                                            <div className='w-full justify-center flex flex-row' >
                                                <span className='text-2xl  text-white font-bold' >
                                                FAVORITE
                                                </span>
                                                 
                                            </div>
                                        </div>
                                        <div className='w-full flex mb-4 flex-row gap-x-4 justify-center items-center' >
                                            <div className='w-10 h-8' >
                                               <img className='w-10 h-8' src="/dashboardImage/message.png" alt="" srcset="" />
                                            </div>
                                            <div className='w-full justify-center flex flex-row' >
                                                <span className='text-2xl text-white font-bold' >
                                                CHAT
                                                </span>
                                                 
                                            </div>
                                        </div>
                                        <div className='w-full flex mb-4 flex-row gap-x-4 justify-center items-center' >
                                            <div className='w-10 h-8' >
                                               <img className='w-10 h-8' src="/dashboardImage/folder.png" alt="" srcset="" />
                                            </div>
                                            <div className='w-full justify-center flex flex-row' >
                                                <span className='text-2xl text-white font-bold' >
                                                FOLDER
                                                </span>
                                                 
                                            </div>
                                        </div>
                                        <div className='w-full flex mb-4 flex-row gap-x-4 justify-center items-center' >
                                            <div className='w-10 h-8' >
                                               <img className='w-10 h-8' src="/dashboardImage/setting.png" alt="" srcset="" />
                                            </div>
                                            <div className='w-full justify-center flex flex-row' >
                                                <span className='text-2xl  text-white font-bold' >
                                                SETTINGS
                                                </span>
                                                 
                                            </div>
                                        </div>
                                    </div>
                         </div>
                         <div className='w-full h-full bg-blue-300 flex flex-col' >
                                                  <div className='w-full h-44 bg-red-400 justify-center items-center flex flex-row justify-between px-16' >
                                                        <div>
                                                              <span className='text-gray-800 text-2xl' >
                                                                 DASHBOARD
                                                              </span>
                                                        </div>
                                                        <div>
                                                          BACK
                                                        </div>
                                                  </div>
                                                  <div className='w-full h-full bg-gray-200 flex flex-col p-10 gap-y-10 ' >
                                                       <div className='w-full h-64 bg-green-300' >

                                                       </div>
                                                       <div className='w-full h-full bg-purple-300 flex flex-row  gap-x-6' >
                                                            <div className='w-2/3 h-full bg-blue-300 flex flex-col gap-y-4'>
                                                                   <div className='w-full h-1/2 bg-purple-300 flex flex-row gap-x-4' >
                                                                           <div className='w-1/2 h-full bg-yellow-200 ' >

                                                                           </div>
                                                                           <div className='w-1/2 h-full bg-gray-400 ' >

</div>
                                                                   </div>
                                                                   <div className='w-full h-1/2 bg-red-300 flex flex-row gap-x-4' >
                                                                     <div className='w-1/2 h-full bg-blue-400' >

                                                                     </div>
                                                                     <div className='w-1/2 h-full bg-pink-500' >

</div>
 
                                                                   </div>
                                                            </div>
                                                            <div className='w-1/3 h-full bg-yellow-300'>

                                                            </div>
                                                       </div>
                                                  </div>
                         </div>
        </div>
    );
};

export default  DashBoard;