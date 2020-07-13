/*
    this template represents a single category and its computed path
    this will be used to render into the jobs page the category

    partners can create, edit, update, delete these
 */

/*

!!!!!
I AM UNSURE ABOUT THIS MODEL
AL and I will discuss options regarding this later

The use case is simply that these are categories for jobs, categories can be parents or children
they will be used for search

however if a job only contains a reference to its 'singular' category how do we find jobs that are children of a parent
i.e.
"show me all Oil & Gas jbos"
but the job only contains "Heavy Machinary Operator" which is a child of mining, which is a child of Oil & Gas
!!!!!

 */

//  ID
//  name (string:required)
//  parentId (id:optional)
//  computedPath (String:Required Oil & Gas > Mining > Heavy Machinary Operator)
//  metadata
//      createdBy (userid:required) //the user from the partner who created this job
//      organization (orgid:required)  //the partner
//      createdDate (date:required)
