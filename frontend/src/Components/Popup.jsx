import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';


function Popup({open,setopen,marginTop,fullWidth=false, maxWidth='',children}) {
  return (
    <Dialog open={open} onClose={()=>{setopen(false)}} fullWidth={fullWidth} maxWidth={maxWidth}>
        <DialogContent style={{marginTop}}>
        {children}
        </DialogContent>
      </Dialog>
  )
}

export default Popup