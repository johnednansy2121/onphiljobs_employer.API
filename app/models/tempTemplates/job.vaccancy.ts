/*
    this template represents what a job will be in the system.
    a job is created by a user at a fllair partner (i.e. isaac from optimum)
    this job may optionally be created on behalf of a client (i.e. isaac from optimum is recruiting for optimums client "virgin")
    but as you'll see int he data model the reference are always back to optimum, isaac, and optionally virgin (later when we deal with client management)

        partners can create, edit, update, delete these

        TESTING WEBHOOK

 */

//  JobID
//  title (string:required)
//  subtitle (string:required)

//  section [
//      title(string: required)
//      description(string: required)
//  ]

//  details
//      location (string:required)
//      salary (optional)
//          base (number:optional)
//          upper (number:optional)
//          currency (string:optional| aud,usd,yuan,etc)
//          type (string: optional | Enum(hourly, salary))
//      commitment
//          type (string :optional Enum(full-time, part-time, casual))
//          duration (optional)
//              quantity (number:required| 3)
//              unit (string:required Enum(days, weeks, years, months))
//      category (jobCategoryID)

//  status (Enum(draft, unlisted, published))

//  premium
//      isFeatured

//  private (this data is never sent to the fllair client application)
//      notes [noteid]

//  metadata
//      createdBy (userid:required) //the user from the partner who created this job
//      organization (orgid:required)  //the partner
//      client (clientid:optional)  //a reference to the partners client (i.e. if optimum is recruiting for virgin airlines)
//      createdDate (date: required)
//      updatedDate (date: required)
//      publishDate (date: required)
