const SSHConfig = require('ssh-config')
class sshdCheck {

    public static sshdConfigPath = "/etc/ssh/sshd_config";

    public static getCurrentConfig() {
        try {
            let rawdata = fs.readFileSync(sshdCheck.sshdConfigPath, 'utf8');
            console.log(rawdata);
            const config = SSHConfig.parse(rawdata)
            return config;
        } catch (error) {
            Supervisor.emitter.emit('sshdParseError', error);
        }
    }

}