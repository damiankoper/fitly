import numpy as np


def _separate_signal(signal):
    x = signal[0]
    y = signal[1]
    z = signal[2]
    return x, y, z


def get_means(signal):
    """
    Returns means for all x, y, z axes
    """
    x, y, z = _separate_signal(signal)
    return np.mean(x), np.mean(y), np.mean(z)


def get_variances(signal):
    """
    Returns variances for all x, y, z axes
    """
    x, y, z = _separate_signal(signal)
    return np.var(x), np.var(y), np.var(z)


def get_standard_deviations(signal):
    """
    Returns standard deviations for all x, y, z axes
    """
    x, y, z = _separate_signal(signal)
    return np.std(x), np.std(y), np.std(z)


def get_medians(signal):
    """
    Returns medians for all x, y, z axes
    """
    x, y, z = _separate_signal(signal)
    return np.median(x), np.median(y), np.median(z)


def get_maximums(signal):
    """
    Returns maximums for all x, y, z axes
    """
    x, y, z = _separate_signal(signal)
    return np.max(x), np.max(y), np.max(z)


def get_minimums(signal):
    """
    Returns minimums for all x, y, z axes
    """
    x, y, z = _separate_signal(signal)
    return np.min(x), np.min(y), np.min(z)


def get_ranges(signal):
    """
    Returns ranges for all x, y, z axes
    """
    maximums = get_maximums(signal)
    minimums = get_minimums(signal)
    return tuple(np.subtract(maximums, minimums))


def _rms(array):
    """
    Returns rms for an array
    """
    return np.sqrt(np.mean(np.power(array, 2)))


def get_root_mean_squares(signal):
    """
    Returns rmses for all x, y, z axes
    """
    x, y, z = _separate_signal(signal)
    return _rms(x), _rms(y), _rms(z)


def get_integrals(signal):
    """
    Returns integrals for all x, y, z axes
    Shows position and velocity
    """
    x, y, z = _separate_signal(signal)
    return np.trapz(x), np.trapz(y), np.trapz(z)


def get_correlation_coefficients(signal):
    """
    Returns correlation coefficients for xy, yz, zx axes pairs
    """
    x, y, z = _separate_signal(signal)
    corrcoef_xy = np.corrcoef(x, y)[0][1]
    corrcoef_yz = np.corrcoef(y, z)[0][1]
    corrcoef_zx = np.corrcoef(z, x)[0][1]
    return corrcoef_xy, corrcoef_yz, corrcoef_zx


def get_cross_correlation(signal):
    """
    Returns max cross correlation between xy, yz, zx axes pairs
    """
    x, y, z = _separate_signal(signal)
    cross_cor_xy = np.mean(np.correlate(x, y))
    cross_cor_yz = np.mean(np.correlate(y, z))
    cross_cor_zx = np.mean(np.correlate(z, x))
    return max((cross_cor_xy, cross_cor_yz, cross_cor_zx))


def _signal_differences(signal):
    """
    Returns lists of deltas between xy, yz, zx values
    """
    x, y, z = _separate_signal(signal)
    diff_xy = abs(np.array(x) - np.array(y))
    diff_yz = abs(np.array(y) - np.array(z))
    diff_zx = abs(np.array(z) - np.array(x))
    return diff_xy, diff_yz, diff_zx


def get_max_differences(signal):
    """
    Returns max differences between xy, yz, zx axes (pointwise)
    """
    diff_xy, diff_yz, diff_zx = _signal_differences(signal)
    return max(diff_xy), max(diff_yz), max(diff_zx)


def _zero_crossings(values, mean):
    """
    Returns count of zero-crossings for one axis signal and it's mean.
    """
    is_above_mean = values[0] > mean

    zero_crossings = 0
    for x in values[1:]:
        if is_above_mean and x < mean:
            is_above_mean = False
            zero_crossings += 1
        elif not is_above_mean and x > mean:
            is_above_mean = True
            zero_crossings += 1

    return zero_crossings


def get_zero_crossings(signal):
    """
    Returns numbers of zero-crossings for each x, y, z signals
    Zero-crossing is when the signal crosses the mean of it's range
    """
    x_mean, y_mean, z_mean = get_means(signal)
    x, y, z = _separate_signal(signal)

    x_zero_crossings = _zero_crossings(x, x_mean)
    y_zero_crossings = _zero_crossings(y, y_mean)
    z_zero_crossings = _zero_crossings(z, z_mean)

    return x_zero_crossings, y_zero_crossings, z_zero_crossings


def get_signal_magnitude_area(signal):
    """
    Returns Signal Magnitude Area for signal
    """
    sum_integrals = sum(get_integrals(signal))
    return sum_integrals / len(signal[0])


def get_signal_vector_magnitude(signal):
    """
    Returns Signal Vector Magnitude for signal
    """
    x, y, z = _separate_signal(signal)

    pow_x = np.power(np.array(x), 2)
    pow_y = np.power(np.array(y), 2)
    pow_z = np.power(np.array(z), 2)

    sum_pows = sum(np.sqrt(pow_x + pow_y + pow_z))

    return sum_pows / len(x)


def get_differential_signal_vector_magnitude(signal):
    pass


def _ffts(signal):
    """
    Returns ffts for each of x, y, z axes
    """
    x, y, z = _separate_signal(signal)

    fft_x = np.fft.fft(x)
    fft_y = np.fft.fft(y)
    fft_z = np.fft.fft(z)

    return fft_x, fft_y, fft_z


def get_dc_components(signal):
    """
    Returns means of spectral coefficients
    """
    ffts = _ffts(signal)
    return abs(np.mean(ffts[0])), abs(np.mean(ffts[1])), abs(np.mean(ffts[2]))


def get_spectral_energies(signal):
    """
    Returns spectral energy for each of x, y, z axes
    """
    fft_x, fft_y, fft_z = _ffts(signal)
    spec_energy_x = np.power(sum(fft_x), 2) / len(fft_x)
    spec_energy_y = np.power(sum(fft_y), 2) / len(fft_y)
    spec_energy_z = np.power(sum(fft_z), 2) / len(fft_z)
    return abs(spec_energy_x), abs(spec_energy_y), abs(spec_energy_z)


def get_spectral_entropies(signal):
    fft_x, fft_y, fft_z = _ffts(signal)
    sen_x = sum([vx * np.log(1 / vx) for vx in fft_x])
    sen_y = sum([vy * np.log(1 / vy) for vy in fft_y])
    sen_z = sum([vz * np.log(1 / vz) for vz in fft_z])
    return abs(sen_x), abs(sen_y), abs(sen_z)