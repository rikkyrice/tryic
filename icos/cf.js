/**
  *
  * main() このアクションを呼び出すときに実行されます
  *
  * @param Cloud Functions アクションは 1 つのパラメーターを受け入れます。このパラメーターは JSON オブジェクトでなければなりません。
  *
  * @return このアクションの出力。この出力は、JSON オブジェクトでなければなりません。
  *
  */
process.env['CLOUDANT_URL'] = '作成したCloudantの資格情報のうちURLを貼り付ける';
process.env['CLOUDANT_APIKEY'] = '作成したCloudantの資格情報のうちAPI KEYを貼り付ける';

const { CloudantV1 } = require('@ibm-cloud/cloudant');

async function main(params) {
    const client = CloudantV1.newInstance({ serviceName: 'CLOUDANT' });
    const DBNAME = 'meibo';
    const response = await client.postFind({
        db: DBNAME,
        selector: {},
        fields: [ '_id', 'NAME', 'INTRO' ]
    });
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          meibo: response.result.docs
        }
    }
}
