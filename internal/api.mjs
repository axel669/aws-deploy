import policyJSON from "./policy.mjs"
import Code from "./lambda-code.mjs"

import IAM from "./iam.mjs"
import Lambda from "./lambda.mjs"
import S3 from "./s3.mjs"

const logging = (open, func) =>
    async (svc, config, args) => {
        console.group(
            open(args)
        )
        const value = await func(svc, config, args)
        console.groupEnd()
        return value
    }

export {
    logging,
    policyJSON,
    Code,
}

export default async (init) => {
    console.log("Initializing AWS SDK...")
    const iam = IAM(init)
    const lambda = Lambda(init)
    const s3 = S3(init)

    console.log("Loading account info...")
    const userInfo = await iam.getUser({})
    return {
        iam,
        lambda,
        s3,
        region: init.region,
        account: userInfo.User.Arn.split(":")[4]
    }
}
