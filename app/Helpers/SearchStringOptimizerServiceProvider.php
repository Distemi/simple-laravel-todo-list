<?php

namespace App\Helpers;

class SearchStringOptimizerServiceProvider
{
    /**
     * @param string $input
     * @return array<string> words
     */
    public static function optimizeString(string $input): array
    {
        preg_match_all('/[A-zА-я]+\s*/um', $input, $matches, PREG_SET_ORDER, 0);
        if (count($matches) === 0) {
            return [];
        }
        $results = [];
        foreach ($matches as $iValue) {
            $results[] = trim($iValue[0]);
        }
        return $results;
    }
}

