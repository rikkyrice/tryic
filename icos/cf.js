/**
  *
  * main() このアクションを呼び出すときに実行されます
  *
  * @param Cloud Functions アクションは 1 つのパラメーターを受け入れます。このパラメーターは JSON オブジェクトでなければなりません。
  *
  * @return このアクションの出力。この出力は、JSON オブジェクトでなければなりません。
  *
  */
process.env['CLOUDANT_URL'] = 'https://apikey-v2-13tn8g8sfizmtlvsoxm8qhugdo2vb6a3kdhcamuoierm:c3222e8b3cca4230a27985d024b76c01@a4d87ca8-2659-4eb7-a51a-c179260cddcd-bluemix.cloudantnosqldb.appdomain.cloud';
process.env['CLOUDANT_APIKEY'] = 'bEpXe6FixYweuNsgsiJNaag1lxf4A_LP_Vfr47wsjRf_';

const { CloudantV1 } = require('@ibm-cloud/cloudant');

async function main(params) {
    const client = CloudantV1.newInstance({ serviceName: 'CLOUDANT' });
    const DBNAME = 'test';
    const response = await client.postFind({
        db: DBNAME,
        selector: {},
        fields: [ 'ID', 'NAME', 'INTRO' ],
        limit: 50
    });
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          meibo: response.result.docs
        }
    }
}
