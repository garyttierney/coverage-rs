import download from 'download';
import {GitHub} from '@actions/github';
import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';

async function main() {
    let version;
    const requestedVersion = '0.8.6';

    // @ts-ignore
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

    const outputDir = `tarpaulin/${version}`;
    await io.mkdirP(outputDir);

    const archiveName = `cargo-tarpaulin-${version}-travis.tar.gz`;
    const archiveUrl = `https://github.com/xd009642/tarpaulin/releases/download/${version}/${archiveName}`;

    await download(archiveUrl, outputDir, {
        followRedirect: true,
    });

    await exec.exec('tar', ['-C', '/usr/share/rust/.cargo/bin/', '-xvf', `${outputDir}/${archiveName}`]);
}

main();