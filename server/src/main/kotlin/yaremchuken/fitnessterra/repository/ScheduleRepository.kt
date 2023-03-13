package yaremchuken.fitnessterra.repository

import org.springframework.data.jpa.repository.JpaRepository
import yaremchuken.fitnessterra.model.Schedule
import yaremchuken.fitnessterra.model.User
import java.time.LocalDate

interface ScheduleRepository: JpaRepository<Schedule, Long> {
    fun getByUserAndScheduledAtBetween(user: User, begin: LocalDate, end: LocalDate): List<Schedule>
}
