import download from 'download';
import decompressTargz from 'decompress-targz';
import {GitHub} from '@actions/github';
import * as exec from '@actions/exec';

async function main() {
    let version;
    const requestedVersion = 'latest';

    if (requestedVersion === 'latest') {
        const gh = new GitHub('token');

        const latestReleaseResponse = await gh.repos.getLatestRelease({
            owner: 'xd009642',
            repo: 'tarpaulin'
        });

        version = latestReleaseResponse.data.tag_name;
    } else {
        version = requestedVersion;
    }

    const archiveUrl = `https://github.com/xd009642/tarpaulin/releases/download/${version}/cargo-tarpaulin-${version}-travis.tar.gz`;

    await download(archiveUrl, '.', {
        followRedirect: true,
        plugins: [decompressTargz()]
    });

    await exec.exec('cargo-tarpaulin');
}

main();