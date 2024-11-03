const AWS = require('aws-sdk');
const ec2 = new AWS.EC2({ region: 'your-region' });

// Create VPC
ec2.createVpc({
  CidrBlock: '10.0.0.0/16'
}, (err, data) => {
  if (err) console.log(err);
  else console.log(data);
});