//Theme from here:
//Site: http://www.bootstrapzero.com/bootstrap-template/facebook
//Code: http://www.bootply.com/96266
//Demo: http://www.bootply.com/render/96266#


import React from 'react';

// define and export our Layout component
export const Layout = ({content}) => (
    <body>
    <div>
       <div className="wrapper">
            <div className="box">
                <div className="row row-offcanvas row-offcanvas-left">

                    <Sidebar/>

                    <div className="column col-sm-10 col-xs-11" id="main">

                        <TopNav/>

                        <div className="padding">
                            <div className="full col-sm-9">

                                <div className="row">

                                    <main>
                                        <div>{content}</div>
                                    </main>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div >
    </body>

);
//<TopNav/>
//<hr />
//<div>{content}</div>

