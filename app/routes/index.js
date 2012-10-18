var mongoose = require('mongoose'),
    conf = require('./configuration.json');

var db = mongoose.createConnection(
    conf.db.host, 
    conf.db.name
);

var InformationSchema = mongoose.Schema({
    data: 'buffer'    
});

var InformationModel = db.model( 
    'info', 
    InformationSchema    
);

exports.offline = {
    api: {
        push: function ( req, res ) {
            var output = { success: false },
                info = req.body,          
                Info = new InformationModel( info );

            Info.save(function ( err, information ) {
                if ( !err ) {        
                    output['success'] = true;

                    res.send( 200, output );
                } else {
                    res.send( 200, output );    
                }
            });
        },

        pull: function ( req, res ) {
            var output = { data: [] },
                Info = InformationModel;
            
            Info.find({}, function ( err, informations ) {
                if ( !err ) {
                    output['data'] = informations.map(function ( info ) {
                        return info['data'].toString('utf-8');
                    });

                    res.send( 200, output );
                } else {
                    res.send( 200, output );    
                } 
            });
        }
    }    
}; 
