'use strict';

/**
 * Maps Session API responses to the internal Session model.
 */
class SessionMapper {

    /**
     * Maps a Session API object.
     *
     * @param {Object} session
     * @returns {Object}
     */
    static fromApi(session) {

        return {

            id: session?.id,
            chargerId: session?.charger_id,
            chargerNickname: session?.charger_nickname,

            startedAt: session?.started_at,
            endedAt: session?.ended_at,

            kwh: session?.kwh,
            status: session?.status,

            countsForEre: session?.counts_for_ere,
            ereCredits: session?.ere_credits,

            idTag: session?.id_tag,

        };

    }

}

module.exports = SessionMapper;