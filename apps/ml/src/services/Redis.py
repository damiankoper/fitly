import aioredis
from config.Config import Config
from models.SessionState import SessionState


class RedisClient:
    def __init__(self, redis_host: str) -> None:
        self.redis = aioredis.from_url(
            f"redis://{redis_host}", encoding="utf-8", decode_responses=True
        )

    async def set_session_state(
        self, session_uuid: str, session_data: SessionState
    ) -> None:
        await self.redis.hset(session_uuid, mapping=session_data.dict())
        await self.redis.expire(session_uuid, Config.SESSION_EXPIRE_SECONDS)

    async def get_session_state(self, session_uuid: str) -> SessionState | None:
        session_dict = await self.redis.hgetall(session_uuid)
        if session_dict:
            return SessionState.parse_obj(session_dict)
        return None


redis_client = RedisClient(Config.REDIS_HOST)
