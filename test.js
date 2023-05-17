// const commandLine = 'command -option1 value1 /option2 value2 --option3 value3';
// const regex = /(\w+)\s+(-\w+)\s+(\w+)(?:\s+\/(-\w+)\s+(\w+))*\s+(--\w+)\s+(\w+)/;

// let match;
// const options = {};

// while ((match = regex.exec(commandLine))) {
//   const option = match[1];
//   const value = match[2];
//   options[option] = value;
// }

// console.log(options);

// const regex = /[-\/]{1}(\w+)\s+(\w+)/g;

// const commandLine = 'command 0option1 value1 //option2 value2 ---option3 value3';

// let match;
// const options = {};

// while ((match = regex.exec(commandLine))) {
//   const option = match[1];
//   const value = match[2];
//   options[option] = value;
// }

// console.log(options);

const ping = require('pingman');
const iconv = require('iconv-lite');

const dd = async () => {
  try {
    const response = await ping('127.0.0.1', {});
    //  const response = iconv.decode(pingResponse, 'win1251');

    // const response = pingResponse.output.toString('cp866');
    console.log({ response: { output: iconv.decode(response.output, 'utf8') } });
  } catch (err) {
    console.log(err);
  }
};

dd();
