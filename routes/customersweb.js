
/*
 * GET users listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM customer',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('customers',{page_title:"Customers - List",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};

exports.details = function(req, res){

  req.getConnection(function(err,connection){
       
        var id = req.params.id;

        var query = connection.query("SELECT * FROM customer WHERE id = ?",[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('customers',{page_title:"Customers - Details",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};

exports.getname = function(req, res){

  req.getConnection(function(err,connection){
       
        var id = req.params.id;

        var query = connection.query("SELECT name FROM customer WHERE id = ?",[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('name',{page_title:"Customers - Name",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};

exports.getaddress = function(req, res){

  req.getConnection(function(err,connection){
       
        var id = req.params.id;

        var query = connection.query("SELECT address FROM customer WHERE id = ?",[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('address',{page_title:"Customers - Address",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};

exports.getphone = function(req, res){

  req.getConnection(function(err,connection){
       
        var id = req.params.id;

        var query = connection.query("SELECT phone FROM customer WHERE id = ?",[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('phone',{page_title:"Customers - Phone",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};

exports.getemail = function(req, res){

  req.getConnection(function(err,connection){
       
        var id = req.params.id;

        var query = connection.query("SELECT email FROM customer WHERE id = ?",[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('email',{page_title:"Customers - Email",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};

exports.add = function(req, res){
  res.render('add_customer',{page_title:"Add Customer"});
};

exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM customer WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_customer',{page_title:"Edit Customer",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

/*Save the customer*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            company : input.company,
            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone 
        
        };
        
        var query = connection.query("INSERT INTO customer set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/customers');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            company : input.company,
            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone 
        
        };
        
        connection.query("UPDATE customer set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/customers');
          
        });
    
    });
};


exports.delete_customer = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM customer  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/customers');
             
        });
        
     });
};

