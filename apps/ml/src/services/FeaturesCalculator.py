import numpy as np


class FeaturesCalculator:
    def __init__(self, signals) -> None:
        self.signals = signals

    def _separate_signal(self):
        x = self.signals[0]
        y = self.signals[1]
        z = self.signals[2]
        return x, y, z

    def get_means(self):
        """
        Returns means for all x, y, z axes
        """
        x, y, z = self._separate_signal()
        return np.mean(x), np.mean(y), np.mean(z)

    def get_variances(self):
        """
        Returns variances for all x, y, z axes
        """
        x, y, z = self._separate_signal()
        return np.var(x), np.var(y), np.var(z)

    def get_standard_deviations(self):
        """
        Returns standard deviations for all x, y, z axes
        """
        x, y, z = self._separate_signal()
        return np.std(x), np.std(y), np.std(z)

    def get_medians(self):
        """
        Returns medians for all x, y, z axes
        """
        x, y, z = self._separate_signal()
        return np.median(x), np.median(y), np.median(z)

    def get_maximums(self):
        """
        Returns maximums for all x, y, z axes
        """
        x, y, z = self._separate_signal()
        return np.max(x), np.max(y), np.max(z)

    def get_minimums(self):
        """
        Returns minimums for all x, y, z axes
        """
        x, y, z = self._separate_signal()
        return np.min(x), np.min(y), np.min(z)

    def get_ranges(self):
        """
        Returns ranges for all x, y, z axes
        """
        maximums = self.get_maximums()
        minimums = self.get_minimums()
        return tuple(np.subtract(maximums, minimums))

    def _rms(self, array):
        """
        Returns rms for an array
        """
        return np.sqrt(np.mean(np.power(array, 2)))

    def get_root_mean_squares(self):
        """
        Returns rmses for all x, y, z axes
        """
        x, y, z = self._separate_signal()
        return self._rms(x), self._rms(y), self._rms(z)

    def get_integrals(self):
        """
        Returns integrals for all x, y, z axes
        Shows position and velocity
        """
        x, y, z = self._separate_signal()
        return np.trapz(x), np.trapz(y), np.trapz(z)

    def get_correlation_coefficients(self):
        """
        Returns correlation coefficients for xy, yz, zx axes pairs
        """
        x, y, z = self._separate_signal()
        corrcoef_xy = np.corrcoef(x, y)[0][1]
        corrcoef_yz = np.corrcoef(y, z)[0][1]
        corrcoef_zx = np.corrcoef(z, x)[0][1]
        return corrcoef_xy, corrcoef_yz, corrcoef_zx

    def get_cross_correlation(self):
        """
        Returns max cross correlation between xy, yz, zx axes pairs
        """
        x, y, z = self._separate_signal()
        cross_cor_xy = np.mean(np.correlate(x, y))
        cross_cor_yz = np.mean(np.correlate(y, z))
        cross_cor_zx = np.mean(np.correlate(z, x))
        return max((cross_cor_xy, cross_cor_yz, cross_cor_zx))

    def _signal_differences(self):
        """
        Returns lists of deltas between xy, yz, zx values
        """
        x, y, z = self._separate_signal()
        diff_xy = abs(np.array(x) - np.array(y))
        diff_yz = abs(np.array(y) - np.array(z))
        diff_zx = abs(np.array(z) - np.array(x))
        return diff_xy, diff_yz, diff_zx

    def get_max_differences(self):
        """
        Returns max differences between xy, yz, zx axes (pointwise)
        """
        diff_xy, diff_yz, diff_zx = self._signal_differences()
        return max(diff_xy), max(diff_yz), max(diff_zx)

    def _zero_crossings(self, values, mean):
        """
        Returns count of zero-crossings for one axis signals and it's mean.
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

    def get_zero_crossings(self):
        """
        Returns numbers of zero-crossings for each x, y, z signals
        Zero-crossing is when the signals crosses the mean of it's range
        """
        x_mean, y_mean, z_mean = self.get_means()
        x, y, z = self._separate_signal()

        x_zero_crossings = self._zero_crossings(x, x_mean)
        y_zero_crossings = self._zero_crossings(y, y_mean)
        z_zero_crossings = self._zero_crossings(z, z_mean)

        return x_zero_crossings, y_zero_crossings, z_zero_crossings

    def get_signal_magnitude_area(self):
        """
        Returns Signal Magnitude Area for signals
        """
        sum_integrals = sum(self.get_integrals())
        return sum_integrals / len(self.signals[0])

    def get_signal_vector_magnitude(self):
        """
        Returns Signal Vector Magnitude for signals
        """
        x, y, z = self._separate_signal()

        pow_x = np.power(np.array(x), 2)
        pow_y = np.power(np.array(y), 2)
        pow_z = np.power(np.array(z), 2)

        sum_pows = sum(np.sqrt(pow_x + pow_y + pow_z))

        return sum_pows / len(x)

    def _ffts(self):
        """
        Returns ffts for each of x, y, z axes
        """
        x, y, z = self._separate_signal()

        fft_x = np.fft.fft(x)
        fft_y = np.fft.fft(y)
        fft_z = np.fft.fft(z)

        return fft_x, fft_y, fft_z

    def get_dc_components(self):
        """
        Returns means of spectral coefficients
        """
        ffts = self._ffts()
        return abs(np.mean(ffts[0])), abs(np.mean(ffts[1])), abs(np.mean(ffts[2]))

    def get_spectral_energies(self):
        """
        Returns spectral energy for each of x, y, z axes
        """
        fft_x, fft_y, fft_z = self._ffts()
        spec_energy_x = np.power(sum(fft_x), 2) / len(fft_x)
        spec_energy_y = np.power(sum(fft_y), 2) / len(fft_y)
        spec_energy_z = np.power(sum(fft_z), 2) / len(fft_z)
        return abs(spec_energy_x), abs(spec_energy_y), abs(spec_energy_z)

    def get_spectral_entropies(self):
        fft_x, fft_y, fft_z = self._ffts()
        sen_x = sum([vx * np.log(1 / vx) for vx in fft_x])
        sen_y = sum([vy * np.log(1 / vy) for vy in fft_y])
        sen_z = sum([vz * np.log(1 / vz) for vz in fft_z])
        return abs(sen_x), abs(sen_y), abs(sen_z)
