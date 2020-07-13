const ResponseMiddleWare = (req : any, res : any) => {
    const { Successful } = req.locals
   
    if(!Successful) 
        res.status(400).json(req.locals)
    else 
        res.status(200).json(req.locals)
}

export default ResponseMiddleWare