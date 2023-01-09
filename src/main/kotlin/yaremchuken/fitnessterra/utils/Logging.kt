package yaremchuken.fitnessterra.utils

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import kotlin.reflect.KClass
import kotlin.reflect.full.companionObject

/**
 * Inspired by https://stackoverflow.com/a/34462577
 *
 *
 * Usage:
 * ```
 * private val log by injectedLogger()
 * log.info("That's all folks!")
 * ```
 */

fun <T : Any> unwrapCompanionClass(ofClass: Class<T>): Class<*> =
    ofClass.enclosingClass?.takeIf {
        ofClass.enclosingClass.kotlin.companionObject?.java == ofClass
    } ?: ofClass

fun <T : Any> logger(forClass: Class<T>): Logger = LoggerFactory.getLogger(unwrapCompanionClass(forClass).name)

fun <T : Any> logger(forClass: KClass<T>): Logger = logger(forClass.java)

fun <R : Any> R.injectedLogger(): Lazy<Logger> = lazyOf(logger(this.javaClass))
