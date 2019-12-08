/**
 * Base class for all services.
 * - has a value,
 * - could be started and stopped,
 * - issue update event when needed,
 * - are usually singletons
 */
module.exports = class BaseService {
  /**
   * Meant for subclasses: allows to set name and initial value
   * @param {object} args - metric arguments, including:
   * @param {string} args.name - service's name
   * @param {any} [args.value = null] - initial value
   */
  constructor({ name, value = null } = {}) {
    Object.assign(this, { name, value })
  }

  /**
   * Used to start the service.
   * From this point, service may issue update event when needed
   */
  start() {
    throw new Error(`Service ${this.name} does not support start`)
  }

  /**
   * Used to stop the service, and dispose any watchers
   */
  dispose() {
    throw new Error(`Service ${this.name} does not support dispose`)
  }
}

/**
 * Service update event
 *
 * @event BaseService#update
 * @type {object}
 * @property {Service} service - the current service
 */