import DataBase from "../core/DataBase"


class UserSettingsService {
    async get(userId: string, key: string) {
        const allUserSettings = await DataBase.read("userSettings")

        const userSetting = allUserSettings.find(s => s.userId === userId)

        if (!userSetting) return null

        return userSetting[key]
    }

    async update(userId: string, key: string, value: string) {
        const allUserSettings = await DataBase.read("userSettings")

        const userSetting = allUserSettings.find(s => s.userId === userId)

        if (!userSetting) {
            await DataBase.write("userSettings", [...allUserSettings, { userId, [key]: value }])
        } else {
            userSetting[key] = value

            const updatedUserSettings = allUserSettings.map(s => {
                if (s.userId === userId) {
                    return { ...s, [key]: value }
                }
                return s
            })

            await DataBase.write("userSettings", updatedUserSettings)
        }
    }

    async delete(userId: string, key: string) {
        const allUserSettings = await DataBase.read("userSettings")

        const userSetting = allUserSettings.find(s => s.userId === userId)

        if (!userSetting) return null

        const updatedUserSettings = allUserSettings.map(s => {
            if (s.userId === userId) {
                delete s[key]
                return s
            }
            return s
        })

        await DataBase.write("userSettings", updatedUserSettings)
    }

    async create(userId: string, key: string, value: string) {
        const allUserSettings = await DataBase.read("userSettings")

        const userSetting = allUserSettings.find(s => s.userId === userId)

        if (!userSetting) {
            await DataBase.write("userSettings", [...allUserSettings, { userId, [key]: value }])
        } else {
            userSetting[key] = value

            const updatedUserSettings = allUserSettings.map(s => {
                if (s.userId === userId) {
                    return { ...s, [key]: value }
                }
                return s
            })

            await DataBase.write("userSettings", updatedUserSettings)
        }
    }
}

export default new UserSettingsService()