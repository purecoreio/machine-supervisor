const { Supervisor, ConsoleUtil } = require("./target/supervisor");
const supervisor = new Supervisor(null);

ConsoleUtil.showTitle();

supervisor.getEmitter().on("loadingMachine", () => {
    ConsoleUtil.setLoading(true, "Loading machine")
}).on("gotMachine", () => {
    ConsoleUtil.setLoading(false, "Got machine", false)
}).on("dockerComError", () => {
    ConsoleUtil.setLoading(false, "Couldn't communicate with docker, please, make sure Docker is running and that you are running this tool as 'sudo'", true)
}).on("dockerComStart", () => {
    ConsoleUtil.setLoading(false, "Created Docker interface", false, false, true)
}).on("errorGettingMachine", (err) => {
    ConsoleUtil.setLoading(false, "Error while loading the machine: " + err.message, true)
    ConsoleUtil.askHash().then((hash) => {
        supervisor.setup(hash);
    })
}).on("hashSavingError", () => {
    ConsoleUtil.setLoading(false, "Error while saving the hash. Please, run this tool as 'sudo'", true)
}).on("hashLoadingError", (err) => {
    ConsoleUtil.setLoading(false, "Error while reading the hash. Please, run this tool as 'sudo': " + err.message, true)
}).on("pushingHardware", () => {
    ConsoleUtil.setLoading(true, "Pushing hardware components")
}).on("pushedHardware", () => {
    ConsoleUtil.setLoading(false, "Pushed hardware components", false)
}).on("errorPushingHardware", () => {
    ConsoleUtil.setLoading(false, "Error while pushing hardware components", true)
}).on("pushingNetwork", () => {
    ConsoleUtil.setLoading(true, "Pushing network adapters")
}).on("pushedNetwork", () => {
    ConsoleUtil.setLoading(false, "Pushed network adapters", false)
}).on("errorPushingNetwork", () => {
    ConsoleUtil.setLoading(false, "Error while pushing network adapters", true)
}).on("checkingCorrelativity", () => {
    ConsoleUtil.setLoading(true, "Checking docker's correlativity with the existing filesystem")
}).on("checkedCorrelativity", () => {
    ConsoleUtil.setLoading(false, "Checked docker's correlativity with the existing filesystem", false)
}).on("errorCheckingCorrelativity", (err) => {
    ConsoleUtil.setLoading(false, "Error while checking docker's correlativity with the existing filesystem. Is docker active? Execute this service as 'sudo': " + err.message, true)
}).on("errorMovingUncorrelatedFolder", (err) => {
    ConsoleUtil.setLoading(false, "Error while moving an uncorrelated folder: " + err.message, true)
}).on("movedUncorrelatedFolder", () => {
    ConsoleUtil.setLoading(false, "Moved uncorrelated folder", false, false, true)
}).on("errorRemovingUncorrelatedContainer", () => {
    ConsoleUtil.setLoading(false, "Error while removing an uncorrelated container", true)
}).on("removedUncorrelatedContainer", () => {
    ConsoleUtil.setLoading(false, "Removed uncorrelated container", false, false, true)
}).on("gettingHosts", () => {
    ConsoleUtil.setLoading(true, "Getting hosts")
}).on("gotHosts", () => {
    ConsoleUtil.setLoading(false, "Got hosts", false)
}).on("errorGettingHosts", () => {
    ConsoleUtil.setLoading(false, "Error while getting hosts", true)
}).on("sshdPendingSubsystem", () => {
    ConsoleUtil.setLoading(false, "Pending sshd subsystem setting", false, false, true)
}).on("sshdPendingChroot", () => {
    ConsoleUtil.setLoading(false, "Pending sshd chroot setting", false, false, true)
}).on("sshdParseError", () => {
    ConsoleUtil.setLoading(false, "sshd parsing error", true)
}).on("sshdConfigurationChanging", () => {
    ConsoleUtil.setLoading(true, "Updating sshd config", false)
}).on("sshdConfigurationChangeError", () => {
    ConsoleUtil.setLoading(false, "Error while updating sshd config", true)
}).on("errorCreatingGroup", () => {
    ConsoleUtil.setLoading(false, "Error while creating the permission group", true)
}).on("creatingGroup", () => {
    ConsoleUtil.setLoading(true, "Creating permission group", false, false, true)
}).on("createdGroup", () => {
    ConsoleUtil.setLoading(false, "Created permission group", false, false, true)
}).on("sshdConfigurationChanged", () => {
    ConsoleUtil.setLoading(false, "Updated sshd config", false)
}).on("creatingContainer", () => {
    ConsoleUtil.setLoading(true, "Creating a new container", false)
}).on("createdContainer", () => {
    ConsoleUtil.setLoading(false, "Created a new container", false)
}).on("startingNewContainer", () => {
    ConsoleUtil.setLoading(true, "Starting new container", false)
}).on("startedNewContainer", () => {
    ConsoleUtil.setLoading(false, "Started new container", false)
}).on("containerCreationError", (err) => {
    ConsoleUtil.setLoading(false, "Error while creating creating container: " + err.message, true)
}).on("creatingContainerNoSizeLimit", () => {
    ConsoleUtil.setLoading(false, "Creating container with no size limit, please, use the overlay2 storage driver, back it with extfs, enable d_type and make sure pquota is available (probably your issue, read more here: https://stackoverflow.com/a/57248363/7280257)", false, true, false);
}).on("startingHealthLogger", () => {
    ConsoleUtil.setLoading(true, "Starting health logger", false);
}).on("startedHealthLogger", () => {
    ConsoleUtil.setLoading(false, "Started health logger", false);
}).on("errorStartingHealthLogger", () => {
    ConsoleUtil.setLoading(false, "Error starting health logger", true);
}).on("socketConnected", () => {
    ConsoleUtil.setLoading(false, "Connected to socket.purecore.io/hosting", false);
}).on("socketAuthenticating", () => {
    ConsoleUtil.setLoading(true, "Authenticating with socket.purecore.io/hosting", true);
}).on("socketAuthenticated", () => {
    ConsoleUtil.setLoading(false, "Authenticated with the socket server", false);
}).on("socketHostRequest", () => {
    ConsoleUtil.setLoading(true, "Requesting control over the socket as a host", false);
}).on("socketHosting", () => {
    ConsoleUtil.setLoading(false, "Acting as a host", false);
}).on("socketDisconnected", () => {
    ConsoleUtil.setLoading(false, "The socket has been disconnected", false, true);
}).on("socketError", () => {
    ConsoleUtil.setLoading(false, "Socket error", false, true);
}).on("socketReconnected", () => {
    ConsoleUtil.setLoading(false, "Reconnected to the socket server", false, false, true);
}).on("socketReconnecting", () => {
    ConsoleUtil.setLoading(true, "Reconnecting to the socket server", false);
}).on("socketReconnectingError", () => {
    ConsoleUtil.setLoading(false, "Error while reconnecting to the socket server", false, true);
}).on("socketReconnectFailed", () => {
    ConsoleUtil.setLoading(false, "Couldn't reconnect to the socket server", true);
})

supervisor.setup();

/*

    Socket Server, replaced by Socket Client.
    Socket Client aims to ensure SSL connections between the panel and the machine
    using a Socket Server node on a correctly setup socket re-emitter server

    }).on("certLoading", () => {
        ConsoleUtil.setLoading(true, "Looking up available SSL certificates", false)
    }).on("certUse", () => {
        ConsoleUtil.setLoading(false, "Using HTTPS certificate generated by let's encrypt", false)
    }).on("certUnknown", () => {
        ConsoleUtil.setLoading(false, "Using HTTP instead of HTTPS, consider setting up let's encrypt", false, true)
    }).on("certReadingError", () => {
        ConsoleUtil.setLoading(false, "Couldn't read let's encrypt (/etc/letsencrypt/), please, run this tool as 'sudo'", true)
    }).on("certNotInstalled", () => {
        ConsoleUtil.setLoading(false, "/etc/letsencrypt/ is not present, please, consider installing let's encrypt for securing your socket server over https", false, true)
    }).on("certNotSetup", () => {
        ConsoleUtil.setLoading(false, "/etc/letsencrypt/ is present, but no certificates have been found, please, consider running certbot", false, true)
    }).on("certFound", () => {
        ConsoleUtil.setLoading(false, "Found a SSL certificate", false)
    }).on("createdServer", () => {
        ConsoleUtil.setLoading(false, "Created HTTP server", false)
    }).on("errorCreatingServer", (err) => {
        ConsoleUtil.setLoading(false, "Error while creating HTTP server: " + err.message, true)
    }).on("creatingSocketServer", () => {
        ConsoleUtil.setLoading(true, "Creating socket server", false)
    }).on("createdSocketServer", () => {
        ConsoleUtil.setLoading(false, "Created socket server", false)
    }).on("errorCreatingSocketServer", (err) => {
        ConsoleUtil.setLoading(false, "Error while creating socket server: " + err.message, true)
    }).on("clientConnected", () => {
        ConsoleUtil.setLoading(false, "Authenticated client connected", false, false, true)
    }).on("clientDisconnected", () => {
        ConsoleUtil.setLoading(false, "Authenticated client disconnected", false, false, true)
*/