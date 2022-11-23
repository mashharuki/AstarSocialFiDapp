# AstarSocialFiDapp

AstarNetwork と連動する SocialFi Dapp 開発用のリポジトリです。

### ビルドコマンド

`cd backend && cargo +nightly-2022-08-15 contract build`

うまく行くと次のように出力される。

```zsh
  - backend.contract (code + metadata)
  - backend.wasm (the contract's code)
  - metadata.json (the contract's metadata)
```

### テストコマンド

`cargo +nightly-2022-08-15 test -- --nocapture`

うまく行くと次のように出力されます。

```zsh

test result: ok. 8 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

### Astar Network のノードをローカルで立てる手順

[https://github.com/mashharuki/Astar](https://github.com/mashharuki/Astar)を参考に資材を持ってきてビルドする。  
ビルドがうまくと`./target/release/astar-collator --help`と打てば Astar 用のコマンドの情報が出力される。

wget を利用してインポートするのもあり

```zsh
wget https://github.com/AstarNetwork/Astar/releases/download/v4.33.0/astar-collator-v4.33.0-macOS-x86_64.tar.gz
```

```zsh
astar-collator 3.7.0-b360c328-aarch64-macos

Stake Technologies <devops@stake.co.jp>
Astar Collator

The command-line arguments provided first will be passed to the parachain node, while the arguments provided after --
will be passed to the relaychain node.

astar-collator [parachain-args] -- [relaychain-args]

USAGE:
    astar-collator [FLAGS] [OPTIONS] [-- <relaychain-args>...]
    astar-collator <SUBCOMMAND>

FLAGS:
        --alice
            Shortcut for `--name Alice --validator` with session keys for `Alice` added to keystore

        --allow-private-ipv4
            Always accept connecting to private IPv4 addresses (as specified in
            [RFC1918](https://tools.ietf.org/html/rfc1918)). Enabled by default for chains marked as "local" in their
            chain specifications, or when `--dev` is passed
        --bob
            Shortcut for `--name Bob --validator` with session keys for `Bob` added to keystore

        --charlie
            Shortcut for `--name Charlie --validator` with session keys for `Charlie` added to keystore

        --dave
            Shortcut for `--name Dave --validator` with session keys for `Dave` added to keystore

        --detailed-log-output
            Enable detailed log output.

            This includes displaying the log target, log level and thread name.

            This is automatically enabled when something is logged with any higher level than `info`.
        --dev
            Specify the development chain.

            This flag sets `--chain=dev`, `--force-authoring`, `--rpc-cors=all`, `--alice`, and `--tmp` flags, unless
            explicitly overridden.
        --disable-log-color
            Disable log color output

        --discover-local
            Enable peer discovery on local networks.

            By default this option is `true` for `--dev` or when the chain type is `Local`/`Development` and false
            otherwise.
        --enable-log-reloading
            Enable feature to dynamically update and reload the log filter.

            Be aware that enabling this feature can lead to a performance decrease up to factor six or more. Depending
            on the global logging level the performance decrease changes.

            The `system_addLogFilter` and `system_resetLogFilter` RPCs will have no effect with this option not being
            set.
        --eve
            Shortcut for `--name Eve --validator` with session keys for `Eve` added to keystore

        --ferdie
            Shortcut for `--name Ferdie --validator` with session keys for `Ferdie` added to keystore

        --force-authoring
            Enable authoring even when offline

    -h, --help
            Prints help information

        --ipfs-server
            Join the IPFS network and serve transactions over bitswap protocol

        --kademlia-disjoint-query-paths
            Require iterative Kademlia DHT queries to use disjoint paths for increased resiliency in the presence of
            potentially adversarial nodes.

            See the S/Kademlia paper for more information on the high level design as well as its security improvements.
        --light
            Experimental: Run in light client mode

        --no-grandpa
            Disable GRANDPA voter when running in validator mode, otherwise disable the GRANDPA observer

        --no-mdns
            Disable mDNS discovery.

            By default, the network will use mDNS to discover other nodes on the local network. This disables it.
            Automatically implied when using --dev.
        --no-private-ipv4
            Always forbid connecting to private IPv4 addresses (as specified in
            [RFC1918](https://tools.ietf.org/html/rfc1918)), unless the address was passed with `--reserved-nodes` or
            `--bootnodes`. Enabled by default for chains marked as "live" in their chain specifications
        --no-prometheus
            Do not expose a Prometheus exporter endpoint.

            Prometheus metric endpoint is enabled by default.
        --no-telemetry
            Disable connecting to the Substrate telemetry server.

            Telemetry is on by default on global chains.
        --one
            Shortcut for `--name One --validator` with session keys for `One` added to keystore

        --password-interactive
            Use interactive shell for entering the password used by the keystore

        --prometheus-external
            Expose Prometheus exporter on all interfaces.

            Default is local.
        --reserved-only
            Whether to only synchronize the chain with reserved nodes.

            Also disables automatic peer discovery.

            TCP connections might still be established with non-reserved nodes. In particular, if you are a validator
            your node might still connect to other validator nodes and collator nodes regardless of whether they are
            defined as reserved nodes.
        --rpc-external
            Listen to all RPC interfaces.

            Default is local. Note: not all RPC methods are safe to be exposed publicly. Use an RPC proxy server to
            filter out dangerous methods. More details: <https://docs.substrate.io/v3/runtime/custom-rpcs/#public-rpcs>.
            Use `--unsafe-rpc-external` to suppress the warning if you understand the risks.
        --storage-chain
            Enable storage chain mode

            This changes the storage format for blocks bodies. If this is enabled, each transaction is stored separately
            in the transaction database column and is only referenced by hash in the block body column.
        --tmp
            Run a temporary node.

            A temporary directory will be created to store the configuration and will be deleted at the end of the
            process.

            Note: the directory is random per process execution. This directory is used as base path which includes:
            database, node key and keystore.

            When `--dev` is given and no explicit `--base-path`, this option is implied.
        --two
            Shortcut for `--name Two --validator` with session keys for `Two` added to keystore

        --unsafe-pruning
            Force start with unsafe pruning settings.

            When running as a validator it is highly recommended to disable state pruning (i.e. 'archive') which is the
            default. The node will refuse to start as a validator if pruning is enabled unless this option is set.
        --unsafe-rpc-external
            Listen to all RPC interfaces.

            Same as `--rpc-external`.
        --unsafe-ws-external
            Listen to all Websocket interfaces.

            Same as `--ws-external` but doesn't warn you about it.
        --validator
            Enable validator mode.

            The node will be started with the authority role and actively participate in any consensus task that it can
            (e.g. depending on availability of local keys).
    -V, --version
            Prints version information

        --ws-external
            Listen to all Websocket interfaces.

            Default is local. Note: not all RPC methods are safe to be exposed publicly. Use an RPC proxy server to
            filter out dangerous methods. More details: <https://docs.substrate.io/v3/runtime/custom-rpcs/#public-rpcs>.
            Use `--unsafe-ws-external` to suppress the warning if you understand the risks.

OPTIONS:
    -d, --base-path <PATH>
            Specify custom base path

        --bootnodes <ADDR>...
            Specify a list of bootnodes

        --chain <CHAIN_SPEC>
            Specify the chain specification.

            It can be one of the predefined ones (dev, local, or staging) or it can be a path to a file with the
            chainspec (such as one exported by the `build-spec` subcommand).
        --database <DB>
            Select database backend to use [possible values: rocksdb, paritydb-experimental, auto]

        --db-cache <MiB>
            Limit the memory the database cache can use

        --offchain-worker <ENABLED>
            Should execute offchain workers on every block.

            By default it's only enabled for nodes that are authoring new blocks. [default: WhenValidating]
            [possible values: Always, Never, WhenValidating]
        --execution <STRATEGY>
            The execution strategy that should be used by all execution contexts [possible values: Native,
            Wasm, Both, NativeElseWasm]
        --execution-block-construction <STRATEGY>
            The means of execution used when calling into the runtime while constructing blocks [possible values:
            Native, Wasm, Both, NativeElseWasm]
        --execution-import-block <STRATEGY>
            The means of execution used when calling into the runtime for general block import (including locally
            authored blocks) [possible values: Native, Wasm, Both, NativeElseWasm]
        --execution-offchain-worker <STRATEGY>
            The means of execution used when calling into the runtime while using an off-chain worker [possible values:
            Native, Wasm, Both, NativeElseWasm]
        --execution-other <STRATEGY>
            The means of execution used when calling into the runtime while not syncing, importing or constructing
            blocks [possible values: Native, Wasm, Both, NativeElseWasm]
        --execution-syncing <STRATEGY>
            The means of execution used when calling into the runtime for importing blocks as part of an initial sync
            [possible values: Native, Wasm, Both, NativeElseWasm]
        --in-peers <COUNT>
            Specify the maximum number of incoming connections we're accepting [default: 25]

        --enable-offchain-indexing <ENABLE_OFFCHAIN_INDEXING>
            Enable Offchain Indexing API, which allows block import to write to Offchain DB.

            Enables a runtime to write directly to a offchain workers DB during block import.
        --ipc-path <PATH>
            Specify IPC RPC server path

        --keep-blocks <COUNT>
            Specify the number of finalized blocks to keep in the database.

            Default is to keep all blocks.
        --keystore-path <PATH>
            Specify custom keystore path

        --keystore-uri <keystore-uri>
            Specify custom URIs to connect to for keystore-services

        --listen-addr <LISTEN_ADDR>...
            Listen on this multiaddress.

            By default: If `--validator` is passed: `/ip4/0.0.0.0/tcp/<port>` and `/ip6/[::]/tcp/<port>`. Otherwise:
            `/ip4/0.0.0.0/tcp/<port>/ws` and `/ip6/[::]/tcp/<port>/ws`.
    -l, --log <LOG_PATTERN>...
            Sets a custom logging filter. Syntax is <target>=<level>, e.g. -lsync=debug.

            Log levels (least to most verbose) are error, warn, info, debug, and trace. By default, all targets log
            `info`. The global log level can be set with -l<level>.
        --max-parallel-downloads <COUNT>
            Maximum number of peers from which to ask for the same blocks in parallel.

            This allows downloading announced blocks from multiple peers. Decrease to save traffic and risk increased
            latency. [default: 5]
        --max-runtime-instances <max-runtime-instances>
            The size of the instances cache for each runtime.

            The default value is 8 and the values higher than 256 are ignored.
        --name <NAME>
            The human-readable name for this node.

            The node name will be reported to the telemetry server, if enabled.
        --node-key <KEY>
            The secret key to use for libp2p networking.

            The value is a string that is parsed according to the choice of `--node-key-type` as follows:

            `ed25519`: The value is parsed as a hex-encoded Ed25519 32 byte secret key, i.e. 64 hex characters.

            The value of this option takes precedence over `--node-key-file`.

            WARNING: Secrets provided as command-line arguments are easily exposed. Use of this option should be limited
            to development and testing. To use an externally managed secret key, use `--node-key-file` instead.
        --node-key-file <FILE>
            The file from which to read the node's secret key to use for libp2p networking.

            The contents of the file are parsed according to the choice of `--node-key-type` as follows:

            `ed25519`: The file must contain an unencoded 32 byte or hex encoded Ed25519 secret key.

            If the file does not exist, it is created with a newly generated secret key of the chosen type.
        --node-key-type <TYPE>
            The type of secret key to use for libp2p networking.

            The secret key of the node is obtained as follows:

            * If the `--node-key` option is given, the value is parsed as a secret key according to the type. See the
            documentation for `--node-key`.

            * If the `--node-key-file` option is given, the secret key is read from the specified file. See the
            documentation for `--node-key-file`.

            * Otherwise, the secret key is read from a file with a predetermined, type-specific name from the chain-
            specific network config directory inside the base directory specified by `--base-dir`. If this file
            does not exist, it is created with a newly generated secret key of the chosen type.

            The node's secret key determines the corresponding public key and hence the node's peer ID in the context of
            libp2p. [default: Ed25519]  [possible values: Ed25519]
        --out-peers <COUNT>
            Specify the number of outgoing connections we're trying to maintain [default: 25]

        --parachain-id <parachain-id>
            Id of the parachain this collator collates for.

            Default: 2007 (shiden) [default: 2007]
        --password <password>
            Password used by the keystore. This allows appending an extra user-defined secret to the seed

        --password-filename <PATH>
            File that contains the password used by the keystore

        --pool-kbytes <COUNT>
            Maximum number of kilobytes of all transactions stored in the pool [default: 20480]

        --pool-limit <COUNT>
            Maximum number of transactions in the transaction pool [default: 8192]

        --port <PORT>
            Specify p2p protocol TCP port

        --prometheus-port <PORT>
            Specify Prometheus exporter TCP Port

        --pruning <PRUNING_MODE>
            Specify the state pruning mode, a number of blocks to keep or 'archive'.

            Default is to keep all block states if the node is running as a validator (i.e. 'archive'), otherwise state
            is only kept for the last 256 blocks.
        --public-addr <PUBLIC_ADDR>...
            The public address that other nodes will use to connect to it. This can be used if there's a proxy in front
            of this node
        --reserved-nodes <ADDR>...
            Specify a list of reserved node addresses

        --rpc-cors <ORIGINS>
            Specify browser Origins allowed to access the HTTP & WS RPC servers.

            A comma-separated list of origins (protocol://domain or special `null` value). Value of `all` will disable
            origin validation. Default is to allow localhost and <https://polkadot.js.org> origins. When running in
            --dev mode the default is to allow all origins.
        --rpc-max-payload <rpc-max-payload>
            Set the the maximum RPC payload size for both requests and responses (both http and ws), in megabytes.
            Default is 15MiB
        --rpc-methods <METHOD SET>
            RPC methods to expose.

            - `Unsafe`: Exposes every RPC method.
            - `Safe`: Exposes only a safe subset of RPC methods, denying unsafe RPC methods.
            - `Auto`: Acts as `Safe` if RPC is served externally, e.g. when `--{rpc,ws}-external` is
              passed, otherwise acts as `Unsafe`. [default: Auto]  [possible values: Auto, Safe,
            Unsafe]
        --rpc-port <PORT>
            Specify HTTP RPC server TCP port

        --state-cache-size <Bytes>
            Specify the state cache size [default: 67108864]

        --sync <SYNC_MODE>
            Blockchain syncing mode.

            - `Full`: Download and validate full blockchain history.

            - `Fast`: Download blocks and the latest state only.

            - `FastUnsafe`: Same as `Fast`, but skip downloading state proofs. [default: Full]
        --telemetry-url <URL VERBOSITY>...
            The URL of the telemetry server to connect to.

            This flag can be passed multiple times as a means to specify multiple telemetry endpoints. Verbosity levels
            range from 0-9, with 0 denoting the least verbosity. Expected format is 'URL VERBOSITY', e.g. `--telemetry-
            url 'wss://foo/bar 0'`.
        --tracing-receiver <RECEIVER>
            Receiver to process tracing messages [default: Log]  [possible values: Log]

        --tracing-targets <TARGETS>
            Sets a custom profiling filter. Syntax is the same as for logging: <target>=<level>

        --wasm-execution <METHOD>
            Method for executing Wasm runtime code [default: Compiled]  [possible values: interpreted-i-know-
            what-i-do, compiled]
        --wasm-runtime-overrides <PATH>
            Specify the path where local WASM runtimes are stored.

            These runtimes will override on-chain runtimes when the version matches.
        --ws-max-connections <COUNT>
            Maximum number of WS RPC server connections

        --ws-max-out-buffer-capacity <ws-max-out-buffer-capacity>
            Set the the maximum WebSocket output buffer size in MiB. Default is 16

        --ws-port <PORT>
            Specify WebSockets RPC server TCP port


ARGS:
    <relaychain-args>...
            Relaychain arguments


SUBCOMMANDS:
    build-spec              Build a chain specification
    check-block             Validate blocks
    export-blocks           Export blocks
    export-genesis-state    Export the genesis state of the parachain
    export-genesis-wasm     Export the genesis wasm of the parachain
    export-state            Export the state of a given block into a chain spec
    help                    Prints this message or the help of the given subcommand(s)
    import-blocks           Import blocks
    key                     Key management cli utilities
    purge-chain             Remove the whole chain
    revert                  Revert the chain to a previous state
    sign                    Sign a message, with a given (secret) key
    vanity                  Generate a seed that provides a vanity address
    verify                  Verify a signature for a message, provided on STDIN, with a given (public or secret) key
```

### ノードを立てる方法

```
./astar-collator --dev
```

下記のように出力されれば成功

```zsh
2022-11-23 15:32:23 Astar Collator
2022-11-23 15:32:23 ✌️  version 4.33.0-9b953e5dafb
2022-11-23 15:32:23 ❤️  by Stake Technologies <devops@stake.co.jp>, 2019-2022
2022-11-23 15:32:23 📋 Chain specification: Development
2022-11-23 15:32:23 🏷  Node name: steep-pain-6984
2022-11-23 15:32:23 👤 Role: AUTHORITY
2022-11-23 15:32:23 💾 Database: RocksDb at /var/folders/0c/vbkwk57s4lb21y1ts4ndr9zh0000gn/T/substratedt1lcb/chains/dev/db/full
2022-11-23 15:32:23 ⛓  Native runtime: astar-local-1 (astar-local-1.tx1.au1)
2022-11-23 15:32:23 🔨 Initializing Genesis block/state (state: 0x284b…53b0, header-hash: 0x8819…73c8)
2022-11-23 15:32:23 👴 Loading GRANDPA authority set from genesis on what appears to be first startup.
2022-11-23 15:32:24 🔨 Running Frontier DB migration from version 1 to version 2. Please wait.
2022-11-23 15:32:24 ✔️ Successful Frontier DB migration from version 1 to version 2 (0 entries).
2022-11-23 15:32:24 Using default protocol ID "sup" because none is configured in the chain specs
2022-11-23 15:32:24 🏷  Local node identity is: 12D3KooWJq2i3KoEoY9wcAiUphCxcq5yCpATsSmaLJQfakWCQ1L9
2022-11-23 15:32:24 💻 Operating system: macos
2022-11-23 15:32:24 💻 CPU architecture: x86_64
2022-11-23 15:32:24 📦 Highest known block at #0
2022-11-23 15:32:24 〽️ Prometheus exporter started at 127.0.0.1:9615
2022-11-23 15:32:24 Running JSON-RPC HTTP server: addr=127.0.0.1:9933, allowed origins=None
2022-11-23 15:32:24 Running JSON-RPC WS server: addr=127.0.0.1:9944, allowed origins=None
2022-11-23 15:32:26 🙌 Starting consensus session on top of parent 0x8819d6602bbc082a89cb8d023b2c5c4d4930da40d83d554912be4d1d230f73c8
```

### Polkadot.js を利用してデプロイしたコントラクトのアドレス

`0x3e8d532cbb1c1e0be9783f528a5f56d5f7baffdfd3076c48ab7a06db9ca244cc`

### 環境構築用のメモ

1. `rustup default stable`
2. `rustup update`
3. `rustup update nightly`
4. `rustup target add wasm32-unknown-unknown --toolchain nightly`

### rust contracts CLI インストール用のコマンド

1. `rustup component add rust-src`
2. `cargo install cargo-dylint dylint-link`
3. `cargo install --force --locked cargo-contract`

### rust nigtly の最新化手順

1. `rustup toolchain install nightly-2022-08-15`
2. `rustup target add wasm32-unknown-unknown --toolchain nightly-2022-08-15`
3. `rustup component add rust-src --toolchain nightly-2022-08-15`

### エラーメモ

```zsh
ERROR: wasm-opt not found! Make sure the binary is in your PATH environment.

We use this tool to optimize the size of your contract's Wasm binary.

wasm-opt is part of the binaryen package. You can find detailed
installation instructions on https://github.com/WebAssembly/binaryen#tools.

There are ready-to-install packages for many platforms:
* Debian/Ubuntu: apt-get install binaryen
* Homebrew: brew install binaryen
* Arch Linux: pacman -S binaryen
* Windows: binary releases at https://github.com/WebAssembly/binaryen/releases
```

と表示された場合には、`npm install wasm-opt -g`で必要なモジュールをインポートすること。

### 参考文献

1. [cargo-contract](https://github.com/paritytech/cargo-contract)
2. [[できた]ASTAR Network(local)上に Ink! を使って RUST 製 smart contract をデプロイ](https://zenn.dev/polonity/articles/ddffad4663a04e)
3. [wget - ファイルをダウンロード - Linux コマンド](https://webkaru.net/linux/wget-command/)
4. [Astar](https://github.com/mashharuki/Astar)
5. [Polkadot Explorer](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.polkadot.io#/explorer)
6. [Astar Portal](https://portal.astar.network/#/astar/assets)
