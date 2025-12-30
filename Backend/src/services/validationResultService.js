
class ValidationResultService {
    static setErrors(vr) {
        const errorMsg = {};
        vr.array().forEach(e => {
            const languageError = e.path.split(/[\.\[\]]/);
            if (languageError.length > 1) {
                const index = parseInt(languageError[1]);
                const key = languageError[3];
                if (!errorMsg.selectedLanguages)
                    errorMsg.selectedLanguages = [];

                if (!errorMsg.selectedLanguages[index])
                    errorMsg.selectedLanguages[index] = {};

                errorMsg.selectedLanguages[index][key] = e.msg;
            } else {
                errorMsg[e.path] = e.msg;
            }
        });
        return errorMsg;
    }
}

module.exports = ValidationResultService;